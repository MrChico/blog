## Baysian Prior: Reality to Deep Learning: Audio

In my research I will try to always think about the research in the context of reality and
experience. I will therefore outline how information in the real world gets translated
through various measuring devices (eyes, ears, cameras, microphones, text, touch). In this
research the focus is on auditory information and thus we have to think about what audio
is, what type of data it becomes when digitized and what transformation we want our neural
networks to perform.

Audio/sounds are pressure waves in a medium that is encoded by our ears (eardrum, cochlea,
ossicles) and perceived as sound.  Imagine all the possible sounds there are, at the
moment we could focus on the band of frequencies availble to human hearing (20Hz-20kHz). 

Imagine the classic sound from 8bit music:
<iframe width="320" height="270"
src="https://www.youtube.com/embed/PnjB5OTn00g?list=PLE44EA8AF6F095EB3" frameborder="90"
allow="autoplay; encrypted-media" allowfullscreen></iframe>
to [opera sounds](https://www.youtube.com/watch?v=cf8uyUtK3fA) (Who is this Victor Borge Comedian/Opera/conductor person who turned 80 in 1989?), 

[animal sounds](https://www.youtube.com/embed/eaXmIPHrHmY)
<iframe width="320" height="270" src="https://www.youtube.com/embed/eaXmIPHrHmY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

instruments and human speech. 

<strong>All possible sounds span sound space.</strong> 
<iframe width="320" height="270"
src="https://s3.envato.com/h264-video-previews/87821136-dccf-4270-a5a3-57f6cca7fde8/20404750.mp4" frameborder="90"
allow="autoplay; encrypted-media" allowfullscreen></iframe>

Raw audio is represented by a waveform. This waveform is an intensity over time-sequence.  A [Fourier Transform](https://en.wikipedia.org/wiki/Fourier_transform) decomposes the signal in to a frequency domain representation, precisely a sum over all frequencies and their magnitude.  A linear set of frequencies played with different magnitudes.

<iframe width="480" height="320" src="https://www.youtube.com/embed/spUNpyF58BY?ecver=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Reality Computer/Digital/Data Intersection

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
(in) an array along with the sampling frequency and can be used to recreate the signal back
to its analogue representation, sound. In the below visualization from Deepminds [wavenet
blogpost](https://deepmind.com/blog/wavenet-generative-model-raw-audio/), the sampled
values are shown as dots on the analogue signal.

<img src="https://storage.googleapis.com/deepmind-live-cms/documents/BlogPost-Fig1-Anim-160908-r01.gif" alt="Wave animation">

In python the [Librosa](https://github.com/librosa/librosa) package can read a wav-file
from disk and convert it into a [numpy](https://docs.scipy.org/doc/numpy/user/quickstart.html) 
array, our raw audio representation.
```python filepath = '/home/erik/Data/phd/project-1/maptask/mono/q1ec2.1.wav'
raw_audio_representation, sample_rate = librosa.load(filepath, sr=20000)
```

## Feature Extraction from Audio Signals relevant to Speech Generation

How to work with audio

* Relevant frequency spectrum for human hearing.
* A spectrogram is a way of visualizing a signal
  * How much information is loosed when converting audio -> spectrogram -> raw audio ?

### GeMaps

The acronym GeMAPS is hort for The Geneva Minimalistic Acoustic Parameter Set (GeMAPS) from the paper:

[The Geneva Minimalistic Acoustic Parameter Set (GeMAPS) for Voice Research and Affective Computing](https://ieeexplore.ieee.org/document/7160715/?reload=true)

The paper is an attempt to standardize the set of parameters used in
audio/speech/hearing/affect processing in order to more easily compare state of the art
solutions and algorithms. The parameters are chosen by three criteria explained in the
paper as: 

<blockquote>
The choice of parameters has been guided (and is justified) by three criteria: 1) the
potential of an acoustic parameter to index physiological changes in voice production
during affective processes, 2) the frequency and success with which the parameter has been
used in the past literature (see Section 2), and 3) its theoretical significance (see [1],
[2]).
</blockquote>

## Tools
[OpenSmile](https://audeering.com/technology/opensmile) is popular
[OpenSmile Book](https://www.audeering.com/research-and-open-source/files/openSMILE-book-latest.pdf)
[Librosa](https://librosa.github.io/librosa/)
