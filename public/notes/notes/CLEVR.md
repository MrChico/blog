
<img class="article-image" src="/images/notes/CLEVR_paper.png" alt="Clevr"> 

# CLEVR: A Diagnostic Dataset for Compositional Language and Elementary Visual Reasoning ([website](https://cs.stanford.edu/people/jcjohns/clevr/), [arxiv]( https://arxiv.org/abs/1612.06890), [pdf]( https://arxiv.org/pdf/1612.06890.pdf))

## Introduction

CLEVR is a Visual Question and Answering (VQA) dataset. It is described as a
"<em>diagnostic dataset for studying the ability of VQA systems to perform
visual reasoning</em>" and stands for Compositional Language and Elementary Visual Reasoning. 


### <strong>Questions to be answered:</strong>
#### 1. What is the purpose of this dataset?

CLEVR is a Visual Question and Answering (VQA) dataset. It is described as a
"<em>diagnostic dataset for studying the ability of VQA systems to perform
visual reasoning</em>" and stands for Compositional Language and Elementary
Visual Reasoning. 

One of the purposes is to explicitly find where models are wrong. Normal VQA
can't give feedback about whether a models object, relationship or color
classifier is off. By programmatically defining the question-answer pairs
there is an explicit way of backtracking what inference was wrong. In other
words the purpose is to 

> ...conduct rich diagnostics to better understand the
> visual reasoning capabilities of VQA systems.

Because the data is synthetic this dataset alone is not sufficient for real
world visual reasoning and the authors state that

> Finally, we stress that accuracy on CLEVR is not an end
> goal in itself: a hand-crafted system with explicit knowl-
> edge of the CLEVR universe might work well, but will not
> generalize to real-world settings. Therefore CLEVR should
> be used in conjunction with other VQA datasets in order to
> study the reasoning abilities of general VQA systems.

#### 2. What is the contribution of this dataset?


#### 3. How large is this dataset?


##### Main Dataset (from website):
* A training set of 70,000 images and 699,989 questions
* A validation set of 15,000 images and 149,991 questions
* A test set of 15,000 images and 14,988 questions
* Answers for all train and val questions
* Scene graph annotations for train and val images giving ground-truth locations, attributes, and relationships for objects
* Functional program representations for all training and validation images

---------------------
### Notes

<img src="/images/notes/CLEVR_figure.png"></img>

### Code 

<strong>Git:</strong> 

[CLEVR Generation](https://github.com/facebookresearch/clevr-dataset-gen)

[Inferring and Executing Programs for Visual Reasoning](https://github.com/facebookresearch/clevr-ieIp)

