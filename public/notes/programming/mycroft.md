# Mycroft

[Documentation](https://mycroft.ai/documentation/)
# Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Install for linux](#install-for-linux)
  * [1. Clone repo](####1)
  * [2. Run dev_setup.sh ](####2)
  * [3. Start Mycroft](####3)
  * [4. Investigate code](####4)
- [Overview](#overview)
- [Technical details](#technical-details)


# Introduction

Mycroft is an open source voice assistant

> Mycroft is the name of a suite of software and hardware tools that use natural language processing and machine learning to provide an open source voice assistant.

> As of late 2017, Mycroft is undergoing heavy development. It is at a level of maturity where developers and hardware hobbyists will be able to use it effectively. However, it is not yet ready for mainstream adoption.


# [Install for linux](https://github.com/MycroftAI/mycroft-core/blob/dev/README.md)

#### 1. Clone repo

```bash
cd ~/
git clone https://github.com/MycroftAI/mycroft-core.git
cd mycroft-core
bash dev_setup.sh
```

#### 2. Run dev_setup.sh

The <strong>[dev_setup.sh](dev_setup.sh)</strong> script installs the dependencies below (taken from the scirpt):

```bash
pt-get install -y \
  git python3 python3-dev python-setuptools \
  python-gobject-2-dev libtool libffi-dev libssl-dev autoconf \
  automake bison swig libglib2.0-dev portaudio19-dev mpg123 \
  screen flac curl libicu-dev pkg-config automake libjpeg-dev \
  libfann-dev build-essential jq
```

![start-mycroft.png](/images/notes/programming/start-mycroft.png)

#### 3. Start Mycroft

Run `start-mycroft.sh debug` to start mycroft. This command starts all services and also the CLI-ui.

```bash
 ➜ ./start-mycroft.sh debug
Starting all mycroft-core services
Initializing...
Create /opt/mycroft/skills
Changing ownership of /opt/mycroft to user: erik with group: erik
changed ownership of '/opt/mycroft/skills' from root:root to erik:erik
changed ownership of '/opt/mycroft' from root:root to erik:erik
Starting background service bus
Starting background service skills
Starting background service audio
Starting background service voice
```

#### 4. Investigate code

When mycroft is installed it creates and operates in a virtual environment and in order to easily
access this environment I created an alias to source it. I first checked the `start-up.sh` script to
see where the environment was created. (I use zsh).

```bash
alias somy="source $HOME/mycroft-core/.venv/bin/activate"
```

Make sure to soure/restart/refresh the terminal such that the new virtual environment is actually
running. After sourcing the virtual environment execute `which pip` in order to see that the correct
pip is used. Mycroft is written in python and so `pip install ipython` will help to check code
snippets and create code.

-------------------------------

# Overview

Major components
- [Server](##server)
- [Speech](##speech)
- [Audio](##audio)
- [Skill](##skills)

## Server

## Speech

## Audio

## Skills

The skills mycroft utilizes are installed through the CLI-command 
`msm install` where msm is the mycroft skill manager. All the skills are git-repos cloned into `/opt/mycroft/skills/` and when mycroft is
started the loading procedure is shown in the cli-ui.

I encountered trouble installing the [desktop-launcher](https://github.com/MycroftAI/skill-desktop-launcher) skill. It complained that I did not have the `gi` module installed.


```bash
sudo apt install libgirepository1.0-dev
```

[pygobject](http://pygobject.readthedocs.io/en/latest/getting_started.html#pypi-getting-started)


# Technical details 

### TTS, STT
[Deepspeech](https://github.com/mozilla/DeepSpeech.git)

based on baidou paper from 2014: (ee: seems interesting)

  * [arxiv](https://arxiv.org/abs/1412.5567)
  * [pdf](https://arxiv.org/pdf/1412.5567.pdf)

-------------------------------

Where is the config and how is the quickest way to test if config is working?



----------------------------



