<img class="article-image" src="https://mycroft.ai/wp-content/uploads/2017/06/Mycroft_Site_Logo.png" alt="Mycroft"> 

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


# Mycroft
# Introduction

Mycroft is an open source voice assistant

> Mycroft is the name of a suite of software and hardware tools that use natural language processing and machine learning to provide an open source voice assistant.

> As of late 2017, Mycroft is undergoing heavy development. It is at a level of maturity where developers and hardware hobbyists will be able to use it effectively. However, it is not yet ready for mainstream adoption.

------------

### My interest

I want to start working on a project like this to get an understanding about how to
program an assisstant. Both from a practical point of view about how to actually design an
assistant but also for research. I want to see how they handle commands and audio and if
the platform could work as a base for me to play arund with TTS/STT/conversation-skills.

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

When mycroft is installed it creates and operates in a virtual environment and in order to easily
access this environment I created an alias to source it. I first checked the `start-up.sh` script to
see where the environment was created. 

```bash
alias somy="source $HOME/mycroft-core/.venv/bin/activate"
```

Make sure to soure/restart/refresh the terminal such that the new virtual environment is actually
running. After sourcing the virtual environment execute `which pip` in order to see that the correct
pip is used. Mycroft is written in python and so `pip install ipython` will help to check code
snippets and create code.

Mycroft can be configured with a config files and may be located in either `/etc/mycroft/mycroft.conf` or `~/.mycroft/mycroft.conf `.

----------------------------

#### Uninstall

Uninstalling is simply to remove the directories used along with the virtual environment
created.

```bash
sudo rm -R ~/virtualenv/mycroft
rm -rf ~/mycroft-core
rm -rf ~/.mycroft
sudo rm -rf /opt/mycroft
```
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

The skills mycroft utilizes are installed through the CLI-command `msm install` where msm is the mycroft skill manager. All the skills are git-repos cloned into `/opt/mycroft/skills/` and when mycroft is started the loading procedure is shown in the cli-ui.

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
