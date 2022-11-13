from torch.nn import LazyLinear, Softmax, Sequential, Module, CrossEntropyLoss, GELU
from transformers import AutoModel
import pandas as pd

resume_data = pd.read_csv("Clustering-People/data/UpdatedResumeDataSet.csv")

class Model(Module):
    def __init__(self):
        super().__init__()
        self.bert = AutoModel.from_pretrained("bert-base-cased")
        self.lin = Sequential(
            LazyLinear(resume_data.Category.nunique() * 10),
            GELU(),
            LazyLinear(resume_data.Category.nunique()),
            )
        self.sMax = Softmax()
        self.lossFxn = CrossEntropyLoss()

    def forward(self, data_dict):
        output = self.bert(data_dict["input_ids"], attention_mask=data_dict["attention_mask"])
        output = self.lin(output.pooler_output)
        output = self.sMax(output)
        loss = self.lossFxn(output, data_dict["labels"])
        return loss, output

