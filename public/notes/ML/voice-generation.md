# Generate a babling agent that captures human dialogue timing behavior


A babbling agent is an entity that produces sounds akin to spoken human language. Imagine sounds from 8bit:
<iframe width="320" height="270"
src="https://www.youtube.com/embed/PnjB5OTn00g?list=PLE44EA8AF6F095EB3" frameborder="90"
allow="autoplay; encrypted-media" allowfullscreen></iframe>
to [opera sounds](https://www.youtube.com/watch?v=cf8uyUtK3fA), [animal
sounds](http://soundbible.com/tags-animal.html), instruments and human speech. All
possible sounds span sound space. 
<iframe width="320" height="270"
src="https://s3.envato.com/h264-video-previews/87821136-dccf-4270-a5a3-57f6cca7fde8/20404750.mp4" frameborder="90"
allow="autoplay; encrypted-media" allowfullscreen></iframe>

Raw audio is represented by a waveform. This waveform is an intensity over time-sequence.  A [Fourier Transform](https://en.wikipedia.org/wiki/Fourier_transform) decomposes the signal in to a frequency domain representation, presicely a sum over all frequencies and their magnitude.  A linear set of frequencies played with different magnitudes.

<iframe width="480" height="320" src="https://www.youtube.com/embed/spUNpyF58BY?ecver=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>







* [SampleRnn](https://arxiv.org/abs/1612.07837) ICLR2017 8 people (Bengio) 
* [Wavenet](https://arxiv.org/pdf/1609.03499.pdf)
* [Deep Speech](https://arxiv.org/pdf/1412.5567.pdf) by Baidu. 
* [Tacotron](https://arxiv.org/abs/1703.10135)

Implementations:
* Nvidia Tacotron2 PyTorch [implementation](https://github.com/NVIDIA/tacotron2)
* Nvidia Wavenet [implementation](https://github.com/NVIDIA/nv-wavenet)


### Practical 
Python package [librosa](https://github.com/librosa/librosa)

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


