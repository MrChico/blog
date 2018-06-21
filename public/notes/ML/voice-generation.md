# Generate a babling agent that captures human dialogue timing behavior
Nyquist–Shannon sampling theorem

A babbling agent is an entity that produces sounds akin to spoken human language. This
could perhaps be achieved by creating a generative model condition on timing information.


## Reality to Deep Learning: Audio

Imagine sounds from 8bit:
<iframe width="320" height="270"
src="https://www.youtube.com/embed/PnjB5OTn00g?list=PLE44EA8AF6F095EB3" frameborder="90"
allow="autoplay; encrypted-media" allowfullscreen></iframe>
to [opera sounds](https://www.youtube.com/watch?v=cf8uyUtK3fA) (Who is this Victor Borge Comedian/Opera/conductor person who turned 80 in 1989?), [animal sounds](http://soundbible.com/tags-animal.html), instruments and human speech. 

All possible sounds span sound space. 
<iframe width="320" height="270"
src="https://s3.envato.com/h264-video-previews/87821136-dccf-4270-a5a3-57f6cca7fde8/20404750.mp4" frameborder="90"
allow="autoplay; encrypted-media" allowfullscreen></iframe>

Raw audio is represented by a waveform. This waveform is an intensity over time-sequence.  A [Fourier Transform](https://en.wikipedia.org/wiki/Fourier_transform) decomposes the signal in to a frequency domain representation, precisely a sum over all frequencies and their magnitude.  A linear set of frequencies played with different magnitudes.

<iframe width="480" height="320" src="https://www.youtube.com/embed/spUNpyF58BY?ecver=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Raw audio is stored in the computer as an array of values. Audio is analogue in reality
but in order to make it storable (on a computer) it is discretized into digital form
(stored as binary values in a transistor). When sound is discretized, using a microphone
to turn analogue data to digital data, it is sampled at a certain frequency (measure the
value at certain time intervals). Thanks to the [Nyquist–Shannon sampling
theorem](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem) the
sampled audio representation can recreate audio at an arbitrary level of quality. 

> For example, for human hearing bandwidth between 0 and 20 kHz, audio must be sampled at
> above 40 kHz. Due to the need for filtering out ultrasonic frequencies resulting from the
> conversion to an analog signal, in practice slightly higher sample rates are used: 44.1
> kHz (CD audio) or 48 kHz (DVD). [wikipedia](https://en.wikipedia.org/wiki/Sound_quality)

Not only are the analogue sound signals discretized in time but often also in the
intensity. This range is typically range between 8 and 24 bits, for example a 16bit audio
signal can take any of 2^16 = 65,536 possible values.  The sampled values are then stored
in an array along with the sampling frequency and can be used to recreate the signal back
to its analogue representation, sound. In the below visualization from Deepminds [wavenet
blogpost](https://deepmind.com/blog/wavenet-generative-model-raw-audio/), the sampled
values are shown as dots on the analogue signal.

<img src="https://storage.googleapis.com/deepmind-live-cms/documents/BlogPost-Fig1-Anim-160908-r01.gif" alt="Wave animation">

In python the [Librosa](https://github.com/librosa/librosa) package can read a wav-file from disk and convert it into a [numpy](https://docs.scipy.org/doc/numpy/user/quickstart.html)
array, out raw audio representation.

```python
filepath = '/home/erik/Data/phd/project0/maptask/mono/q1ec2.1.wav'
raw_audio_representation, sample_rate = librosa.load(filepath, sr=20000)
```

When training deep generative models on raw audio these arrays are the ground truths, the
input and the labels. Given a dataset of a certain distribution train a generative model
to produce data as close as possible to this distribution. In this post we will look on
three well known papers that all relate to the problem of speech generation.

1. Google Wavenet
2. SampleRNN
3. Tacotron


## Papers
Paper used for research about how to generate audio.

### [Wavenet: A GENERATIVE MODEL FOR RAW AUDIO](https://arxiv.org/pdf/1609.03499.pdf)
<embed class="paper-pdf" src="https://arxiv.org/pdf/1609.03499.pdf" width="600" height="300" type='application/pdf'>

### [SampleRnn: AN UNCONDITIONAL END-TO-END NEURAL AUDIO GENERATION MODEL](https://arxiv.org/abs/1612.07837) 
ICLR2017 8 people (Bengio) 
<embed class="paper-pdf" src="https://arxiv.org/pdf/1612.07837.pdf" width="600" height="300" type='application/pdf'>

### [Tacotron: Towards End-to-End Speech Synthesis](https://arxiv.org/abs/1703.10135) 
<embed class="paper-pdf" src="https://arxiv.org/pdf/1703.10135.pdf" width="600" height="300" type='application/pdf'>
Paper trail:
* [BLOG: Tacotron: Towards End-to-End Speech Synthesis](https://ai.googleblog.com/2018/03/expressive-speech-synthesis-with.html)
* [BLOG: Tacotron 2: Generating Human-like Speech from Text](https://ai.googleblog.com/2017/12/tacotron-2-generating-human-like-speech.html)
* [BLOG: TFGAN: A Lightweight Library for Generative Adversarial Networks](https://ai.googleblog.com/2017/12/tfgan-lightweight-library-for.html) 

### [Deep Speech: Scaling up end-to-end speech recognition](https://arxiv.org/pdf/1412.5567.pdf) 
<embed class="paper-pdf" src="https://arxiv.org/pdf/1412.5567.pdf" width="600" height="300" type='application/pdf'>

#### Code

Implementations:
* Nvidia Tacotron2 PyTorch [implementation](https://github.com/NVIDIA/tacotron2)
* Nvidia Wavenet [implementation](https://github.com/NVIDIA/nv-wavenet)

##### Tools Code
Python packages
  * [librosa](https://github.com/librosa/librosa)
  * [numpy](https://github.com/librosa/librosa)

## Wavenet

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


## SampleRNN

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


