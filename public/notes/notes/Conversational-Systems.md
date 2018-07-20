# Conversational Systems

## Models

<strong>Building blocks.</strong> 
1. Define a dialogue. A set of utterences.
2. Define utterences.  A set of tokens.
3. Define tokens. Tokens represents both words and speech acts. 

<strong>Generator: a generative "model of dialague"</strong> 
1. The model parameterizes a probability distribution <em>P</em> with the parameters <tex>\theta</tex>
2. Define expression mathematically representing this distribution.
  * The dependencies of the model.
3. The definition of the model depends on the conditional distribution P, conditioned on
   the previous sampled tokens.

> Using standard n-grams to compute joint probabilities over dialogues, e.g. computing
> probability tables for each token given the <em>n</em> preceding tokens suffers from the
> curse of dimensionality and is intractable for any realistic vocabulary size.

Then cites Bengio et al(2003) that proposed <em>word embeddings</em>.
