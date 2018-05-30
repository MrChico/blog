# Mopidy

All instructions below are taken from the official [Documentation](https://docs.mopidy.com/en/latest/#)

## Install mopidy

1. Add the archive’s GPG key:

```bash
wget -q -O - https://apt.mopidy.com/mopidy.gpg | sudo apt-key add -
wget -q -O - https://apt.mopidy.com/mopidy.gpg | sudo apt-key add -
```

2. Add the APT repo to your package sources:

```bash
sudo wget -q -O /etc/apt/sources.list.d/mopidy.list https://apt.mopidy.com/stretch.list
```

3. Install Mopidy and all dependencies:

```bash
sudo apt-get update
sudo apt-get install mopidy
```


4. Finally, you need to set a couple of config values, and then you’re ready to run Mopidy. Alternatively you may want to
   have Mopidy run as a system service, automatically starting at boot.

When a new release of Mopidy is out, and you can’t wait for you system to figure it out for itself, run the following to
upgrade right away:

```bash
sudo apt-get update
sudo apt-get dist-upgrade
```

## Summary

Mopidy is an extensible music server written in Python.

Mopidy plays music from local disk, Spotify, SoundCloud, Google Play Music, and more. You edit the playlist from any phone, tablet, or computer using a range of MPD and web clients.

### Stream music from the cloud

Vanilla Mopidy only plays music from your local disk and radio streams. Through extensions, Mopidy can play music from cloud services like Spotify, SoundCloud, and Google Play Music. With Mopidy’s extension support, backends for new music sources can be easily added.

### Mopidy is just a server

Mopidy is a Python application that runs in a terminal or in the background on Linux computers or Macs that have network connectivity and audio output. Out of the box, Mopidy is an MPD and HTTP server. Additional frontends for controlling Mopidy can be installed from extensions.

### Everybody use their favorite client

You and the people around you can all connect their favorite MPD or web client to the Mopidy server to search for music and manage the playlist together. With a browser or MPD client, which is available for all popular operating systems, you can control the music from any phone, tablet, or computer.

### Mopidy on Raspberry Pi

The Raspberry Pi is a popular device to run Mopidy on, either using Raspbian or Arch Linux. It is quite slow, but it is very affordable. In fact, the Kickstarter funded Gramofon: Modern Cloud Jukebox project used Mopidy on a Raspberry Pi to prototype the Gramofon device. Mopidy is also a major building block in the Pi Musicbox integrated audio jukebox system for Raspberry Pi.

### Mopidy is hackable

Mopidy’s extension support and Python, JSON-RPC, and JavaScript APIs makes Mopidy perfect for building your own hacks. In one project, a Raspberry Pi was embedded in an old cassette player. The buttons and volume control are wired up with GPIO on the Raspberry Pi, and is used to control playback through a custom Mopidy extension. The cassettes have NFC tags used to select playlists from Spotify.
