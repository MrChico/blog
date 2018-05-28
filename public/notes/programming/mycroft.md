# Mycroft


## Introduction

Mycroft is an open source voice assistant

> Mycroft is the name of a suite of software and hardware tools that use natural language processing and machine learning to provide an open source voice assistant.

> As of late 2017, Mycroft is undergoing heavy development. It is at a level of maturity where developers and hardware hobbyists will be able to use it effectively. However, it is not yet ready for mainstream adoption.

### Install

[Documentation](https://mycroft.ai/documentation/)

[Install for linux](https://github.com/MycroftAI/mycroft-core/blob/dev/README.md)


```bash
cd ~/
git clone https://github.com/MycroftAI/mycroft-core.git
cd mycroft-core
bash dev_setup.sh
```

<strong>[dev_setup.sh](dev_setup.sh)</strong> downloads dependencies:

```bash
pt-get install -y \
  git python3 python3-dev python-setuptools \
  python-gobject-2-dev libtool libffi-dev libssl-dev autoconf \
  automake bison swig libglib2.0-dev portaudio19-dev mpg123 \
  screen flac curl libicu-dev pkg-config automake libjpeg-dev \
  libfann-dev build-essential jq
```

![start-mycroft.png](/images/notes/programming/start-mycroft.png)

Run [start\-mycroft.sh all ](start\-mycroft.sh) to start
mycroft. Then after it starts up

```bash
 ➜ ./start-mycroft.sh all
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

-------------------------------

CLI


[Deepspeech](https://github.com/mozilla/DeepSpeech.git)

based on baidou paper from 2014: (ee: seems interesting)

  * [arxiv](https://arxiv.org/abs/1412.5567)
  * [pdf](https://arxiv.org/pdf/1412.5567.pdf)

-------------------------------

Where is the config and how is the quickest way to test if config is working?





