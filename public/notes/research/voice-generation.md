# Generate a babling agent that captures human dialogue timing behavior

The preliminary goal of this research is to produce a babbling agent with human-like
timing. A babbling is an entity that produces sounds akin to spoken human language. In
human speech information is conveyed through the words spoken along with specific sounds
produced but also in the timing implemented to organize the communication. This timing is
a major factor in how natural we find any interaction. As a starting point this research
focusing on the task of learning a generative speech model conditioned on timing
information. The emphasis is not on the semantic meaning of words but on when utterances
should be made.

Previous work [Skantze, Roddy] trains models to predict a probability associated with
whether the relevant speaker is speaking at an arbitrary interval in to the future (I need
to rephrase this paragraph). In simple terms the goal is to, given a specific dataset
containing spoken dialog with a ground truth of when a participant is speaking, train a
model to predict this as accurately as possible. These models can then be used in a
conversational system in order to maximize the natural timing of the system.

(Here comes the argumentation of why this work is an update to the previous research)
Interactivity.

## Future Goal
A conversation is instantiated by the actual passing of information in the real world. The
speech and movements/correlated gestures instantiates conversation and the speaker is
analogously driving the metaphorical conversational car. Both parts has accessed to their
own local model of not only the metaphorical car but also of the landscape of the world in
which this car is driving. The actual path the car will take is the intersection of the
real worlds model of instantiation (ground truth, reality) and the participants internal
models. The participants instantiates the conversational car/path/landscape from their
interacting with each other through the "real" world.

The current speaker is the driver of the car and the switching of speaker is when another
agents continues the speech. When a shift like this occurs depends on the previously sent
information, the participants backgrounds and associations, the participants intent of the
conversation and their personalities. That is the properties of the involved generative
models. However, to understand when the drivers switch one possibility is that there are
enough information in the local audio signal that timing can be correctly classified to a
sufficiently (for what purpose) high degree.



## Deep Learning When training unconditional deep generative models to generate raw audio
the audio arrays are both the ground truths, the labels and the data. Given a dataset of a
certain distribution train a generative model to produce data as close as possible to this
distribution. A common approach for doing this (are there another way?) is to, given an
audio input sequence of a certain duration/length, generate the future audio in a way as
close to the actual continuation of the raw audio as possible. Given a sequence of samples
`{x\_i, ..., x\_(i+T)}` where T is the amount of samples in each sequence, predict `{x\_{i+T+1}`,
..., x\_(i+T+N)}. Without any additional input these generative model will try to capture
the data distribution of the particular dataset as well as possible. In short a model is
given an input sequence, predict the future of that sequence, the prediction is compared
to the ground truth and the difference between the two is minimized.


//TODO
In this post we will look on three well known papers that all relate to the problem of
speech generation. First I start with the seminal paper from Deepmind called wavenet, then
sampleRNN followed by Tacotron.
//TODO

------------------

## [Wavenet: A GENERATIVE MODEL FOR RAW AUDIO](https://arxiv.org/pdf/1609.03499.pdf)

<embed class="paper-pdf" style="margin: 0; padding: 0" src="https://arxiv.org/pdf/1609.03499.pdf" width="600" height="300" type='application/pdf'>

[Faster Wavenet](https://arxiv.org/pdf/1711.10433.pdf)

(Disclaimer: most things stated here are paraphrased from paper)

### Causal Convolutions

Convolutions in general intrinsically utilizes neighboring datapoints in their operations.
When a convolutional layer calculates an output value for a certain pixel on an image it
uses other pixels around the relevant pixel, the amount of which is based on the kernel
size, to calculate the correlating output. When applying convolutions on time sequence
data, as the sound arrays we are focusing on in this post, at certain moments in time only
the current datapoint and the datapoints in the past are known and so the convolutional
operation cannot, for obvious reasons, use datapoints from the future. In order to account
for this fact wavenet utilizes what they call causal convolutions. 

<img width="400" src="/images/notes/DeepLearning/causal-convs.png" alt="causal convolutions">
> Image from the Wavenet [paper](https://arxiv.org/pdf/1609.03499.pdf)

For 1D time sequence arrays as audio this can be achieved by applying a normal convolution
and then shift the output. Meaning that the output from one convolutional operation will
be used in later time steps as is implied by the image above.

### Dilated Convolutions

RNN structures can model the current output conditioned on all previously seen points,
meaning that the receptive field of an RNN in theory is infinte. However, feedforward
convolutions do not share this property and has a receptive field dependent on the size of
the convolution filter and the amount of layers used. In the image above we acknowledge
that 5 datapoints are used in the input dimension to produce the output sample. Sound is
generally sampled at an order of magnitude of 10^4 samples per second (16 kHz is a common
sampling frequency for "lower" wuality audio used in deep learning) Which means that in
order to produce a 1 second long audio we need 16000 datapoints and if our receptive field
is too small the long term dependencies in the data will be difficult to model. In order
to counteract this wavenet implements diluted convolutional operations depitcted in the
images below.

<img src="https://storage.googleapis.com/deepmind-live-cms/documents/BlogPost-Fig2-Anim-160908-r01.gif" alt="Architecture animation">
> Image from the Wavenet [wavenet blogpost](https://deepmind.com/blog/wavenet-generative-model-raw-audio/)


------------------


## [SampleRnn: AN UNCONDITIONAL END-TO-END NEURAL AUDIO GENERATION MODEL](https://arxiv.org/abs/1612.07837) 
ICLR2017 8 people (Bengio) 
<embed class="paper-pdf" style="margin: 0; padding: 0" src="https://arxiv.org/pdf/1612.07837.pdf" width="600" height="300" type='application/pdf'>
Notes from paper.

> The particular difficulty of audio generation is that there is often a very large
> discrepency between the dimensionality of the raw audio signal and that of the effective
> semantic-level signal

At 16000 kHz on average a word will contain 6000 generated samples.

Tradtionally the problem is "simplified" by compressing the audio into spectral ofr
hand-engineered features and defining generative models on these features. The model
generates these features which are then decompressed/decoded back to raw audio but often
with degraded sample quality and require "extensive domain-exert corrective measures".

The authors stated contribution
1. We present a novel method that utilizes RNNs at <strong>different scales</strong>  to model longer term dependencies in audio waveforms while training on short sequences which results in memory efficiency during training.
2. We extensively explore and compare variants of models achieving the above effect.
3. We study and empirically evaluate the impact of different components of our model on three audio datasets. Human evaluation also has been conducted to test these generative models.

The model depends on two different kinds of structures inate in the hierarchy. The first
module mentioned is the Frame-Level modules which are all the modules in the higher levels
of the hierarchy, meaning all but the first module. the module "closes" to the data is
called the sample level module.

------------------
## [Tacotron: Towards End-to-End Speech Synthesis](https://arxiv.org/abs/1703.10135) 

<embed class="paper-pdf" style="margin: 0; padding: 0" src="https://arxiv.org/pdf/1703.10135.pdf" width="600" height="300" type='application/pdf'>
Paper trail:
* [BLOG: Tacotron: Towards End-to-End Speech Synthesis](https://ai.googleblog.com/2018/03/expressive-speech-synthesis-with.html)
* [BLOG: Tacotron 2: Generating Human-like Speech from Text](https://ai.googleblog.com/2017/12/tacotron-2-generating-human-like-speech.html)
* [BLOG: TFGAN: A Lightweight Library for Generative Adversarial Networks](https://ai.googleblog.com/2017/12/tfgan-lightweight-library-for.html) 

------------------
## [Neural Discrete Representation Learning](https://arxiv.org/abs/1711.00937) 
<embed class="paper-pdf" style="margin: 0; padding: 0" src="https://arxiv.org/pdf/1711.00937.pdf" width="600" height="300" type='application/pdf'>

* [pdf](https://arxiv.org/pdf/1711.00937.pdf)
* [Blog: Neural Discrete Representation Learning](https://avdnoord.github.io/homepage/vqvae/)

Prior Knowledge
1. [Tutorial on Variation Autoencoders (arxiv)](https://arxiv.org/pdf/1606.05908.pdf)
2. [What is a variational autoencoder ](https://jaan.io/what-is-variational-autoencoder-vae-tutorial/)
3. [KL-Divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence)

<img width='80%' src="/images/notes/DeepLearning/VAE.png" alt="VAE">
Figure taken from [1. Tutorial on Variation Autoencoders (arxiv)](https://arxiv.org/pdf/1606.05908.pdf)


## Spectrogram

## What is Windowing
### [Source: Window in FFT](http://download.ni.com/evaluation/pxi/Understanding%20FFTs%20and%20Windowing.pdf)
<img width="500" src="/images/notes/DeepLearning/FFT-window-explenation1.png" alt="Window 1">
<img width="500" src="/images/notes/DeepLearning/FFT-window-explenation2.png" alt="Window 2">
<img width="500" src="/images/notes/DeepLearning/FFT-window-explenation3.png" alt="Window 3">

everything under here is as of now copied from wiki

### Mel-frequence cepstrum
In sound processing, the mel-frequency cepstrum (MFC) is a representation of the short-term power spectrum of a sound, based on a linear cosine transform of a log power spectrum on a nonlinear mel scale of frequency.

### MFCC

Mel-frequency cepstral coefficients (MFCCs) are coefficients 
They are derived from a type of cepstral representation of the audio clip (a nonlinear "spectrum-of-a-spectrum").
