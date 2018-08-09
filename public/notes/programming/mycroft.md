<img class="article-image" src="https://mycroft.ai/wp-content/uploads/2017/06/Mycroft_Site_Logo.png" alt="Mycroft"> 

<div style="border:2px solid;padding:30px;background:" class="Menu">

# Table of Contents

- [Documentation](https://mycroft.ai/documentation/)
- [Introduction](#introduction)
- [Install for linux](#install-for-linux)
  * [1. Clone repo](####1)
  * [2. Run dev_setup.sh ](####2)
  * [3. Start Mycroft](####3)
  * [4. Investigate code](####4)
- [Overview](#overview)
- [Technical details](#technical-details)
</div>

<div style="border:2px solid;padding:30px;width:100%" class="Main">

# Mycroft

<br>
<br>

<div style="border:2px solid;padding:30px;background:" class="Introduction">

# Introduction

Mycroft is an open source voice assistant

> Mycroft is the name of a suite of software and hardware tools that use natural language processing and machine learning to provide an open source voice assistant.

> As of late 2017, Mycroft is undergoing heavy development. It is at a level of maturity where developers and hardware hobbyists will be able to use it effectively. However, it is not yet ready for mainstream adoption.

</div>

<br>
<br>

### My interest

I want to start working on a project like this to get an understanding about how to
program an assisstant. Both from a practical point of view about how to actually design an
assistant but also for research. I want to see how they handle commands and audio and if
the platform could work as a base for me to play arund with TTS/STT/conversation-skills.

-------------------



<br>
<br>

<div style="border:2px solid;padding:30px;background:" class="Install">

# [Install for linux](https://github.com/MycroftAI/mycroft-core/blob/dev/README.md)
  #### 1. Clone repo

  ```bash
  cd ~/
  git clone https://github.com/MycroftAI/mycroft-core.git
  ```

#### 2. Run dev_setup.sh

Go to the repo folder and run dev_setup.sh.

```bash
cd mycroft-core && bash dev_setup.sh
```

The <strong>[dev_setup.sh](dev_setup.sh)</strong> script installs the dependencies below (taken from the scirpt):

```bash
apt-get install -y \
  git python3 python3-dev python-setuptools \
  python-gobject-2-dev libtool libffi-dev libssl-dev autoconf \
  automake bison swig libglib2.0-dev portaudio19-dev mpg123 \
  screen flac curl libicu-dev pkg-config automake libjpeg-dev \
  libfann-dev build-essential jq
```

This will install all the files and this step could take some time.

#### 3. Start Mycroft

Run `./start-mycroft.sh debug` to start mycroft. This command starts all services and also the CLI-ui.

![start-mycroft.png](/images/notes/programming/start-mycroft.png)

#### 4. Investigate code

When mycroft is installed it creates and operates in a virtual environment and in order to
easily access this environment I created an alias to source it. I first checked the
[start-up.sh](https://github.com/MycroftAI/mycroft-core/blob/dev/start-mycroft.sh) script
to see where the environment was created. 

```bash
alias somy="source $HOME/mycroft-core/.venv/bin/activate"
```

Make sure to soure/restart/refresh the terminal such that the new virtual environment is actually
running. After sourcing the virtual environment execute `which pip` in order to see that the correct
pip is used. Mycroft is written in python and so `pip install ipython` will help to check code
snippets and create code.

Mycroft can be configured with a config files and may be located in either `/etc/mycroft/mycroft.conf` or `~/.mycroft/mycroft.conf `.

#### Uninstall

Uninstalling is simply to remove the directories used along with the virtual environment
created.

```bash
rm -rf ~/mycroft-core
rm -rf ~/.mycroft
sudo rm -rf /opt/mycroft
```

</div>

<br>
<br>

<div style="border:2px solid;padding:30px;background:" class="Overview">

# Overview
<figure>
  <img src="/images/onenote/mycroft.png" alt="Mycroft note with onenote" width="100%" > 
  <figcaption>Figure: Notes on mycroft. </figcaption>
</figure> 


#### This section is just a reformulation of ["About Mycroft"](https://mycroft.ai/documentation/mycroft-software-hardware/#about-mycroft) in the documentation for my own learning.

Mycroft first always listens for the wake word using [PocketSphinx]() which is built on CMUSphinx [(tutorial for developers)](https://cmusphinx.github.io/wiki/tutorial/).  This is a lightweight speech recognition software to activate mycroft. Once the wake word has been processed an audio-recording is initialized and when finished sends the audioclip to the google [STT-API](https://cloud.google.com/speech-to-text/). The API turns the audio file into text. After this the text is processed for intent and by default is handled by [adapt](https://github.com/MycroftAI/adapt).

The Major components started when initializing `./mycroft_start.sh all` are the server,
speech, audio and skill programs. 

</div>

<br>
<br>

<div style="border:2px solid;padding:30px;background:" class="Todo">

# TODO

* How are skills implemented? 
* What code initates a skill?
* Where is the list of keywords from all skills located?
* Implement a simple skill -> first project
* Implement many skills -> Projects

Skills:
- The skills mycroft utilizes are installed through the CLI-command `msm install` where msm is the mycroft skill manager. All the skills are git-repos cloned into `/opt/mycroft/skills/` and when mycroft is started the loading procedure is shown in the cli-ui.


<div style="border:2px solid;padding:20px;background:" class="Projects" id="container">

## Skills

* Step 1: [Introduction developing skills](https://mycroft.ai/documentation/skills/introduction-developing-skills/)


<div style="border:2px solid;padding:30px;background:" class="skill" id="switchDesktop">

## Switch Desktop

Make projects that makes it easier to interact with MacOS. My apple skills are good enough
for work.  MacOS does not seem to have a straight forward way to focus screens (can this
be right?)

</div>

<br>
<br>

<div style="border:2px solid;padding:30px;background:" class="skill" id="openFile">

## Open file

I want to be able to search in an arbitrary folder for pdf and open it with zathura (or
customizeable pdf-reader). Open new documents in tab of existing session.

1. query.filepath
2. execute command (open, show folder terminal/dolphin,)
</div>

<br>
<br>

<div style="border:2px solid;padding:30px;background:" class="skill" id="recorder">

## Recorder

> user: Computer record.

* Floating window with buttons to label the current time in the recording
* Store data
  * Audio recording
  * Google ASR
  * User label
  * Keyboard events
  * Mouse events
</div>


</div>

<br>
<br>

## Technical details 

In progress speech recognition [Deepspeech](https://github.com/mozilla/DeepSpeech.git), a project by mozilla based on baidou paper from 2014: (ee: seems interesting)
  * [arxiv](https://arxiv.org/abs/1412.5567)
  * [pdf](https://arxiv.org/pdf/1412.5567.pdf)

</div>
</div>
