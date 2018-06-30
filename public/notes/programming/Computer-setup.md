# Computer Setup

A post containing an interface to my computer setup. This is the starting point for a fresh computer initialization. This repo contains all the config files, linkers and developer tools.

Full installation can be found in [README](https://github.com/ErikEkstedt/.files/blob/master/README.md) but is essentially using these tools:
1. [Dotfiles](https://github.com/ErikEkstedt/.files) repository
2. Setup/workflow heavily depends on Vim and tmux.
3. SSH
4. Synergy
5. Mycroft 

------------------

## Install Linux on MacbookPro 2017

<strong>:bulb: WARNING: Wifi is not working correctly (no 5GHz) :bulb:</strong> 

The bad Wifi makes it kind of unusable. Have to wait to install KDE until it is resolved.

Prerequisites: usb for boot, usb keyboard and mouse

[Linux on MBP](https://gist.github.com/roadrunner2/1289542a748d9a104e7baec6a92f9cd7#file-0-linux-on-mbp-late-2016-md): The most complete source.

[Linux on mid-2017 MacbookPro](https://nixaid.com/linux-on-macbookpro/): Tutorial that
fixes touchpad/keyboard before install [Advanced].

`sudo iwconfig wlp3s0 txpower 10dBm`


1. [Partition hard-drive](https://www.lifewire.com/dual-boot-linux-and-mac-os-4125733) 
  * disk utility set `MD-DOS(FAT)`
2. Keyboard and touchpad does not work out of box
  * [mbp](https://github.com/Dunedan/mbp-2016-linux#keyboard--touchpad)


### Why Kde over MacOs?

Linux is open-source and great. I want to run linux on all devices as much as I can.

Detail: A detail was that my workflow was interrupted by the inability to make
cmd-hotkeys/shortcuts as I wish. The major thing was to use cmd-hjkl in terminal for
moving around. This can of course be fixed and because of the bad WiFi property I have to
fix this instead of dual booting. I am sad that I can't run Linux on my MBP :(

------------------

## SSH

All computers needs to run both client and server ssh such that all computers can get files from all other computers.
* [blog](https://dev.to/zduey/how-to-set-up-an-ssh-server-on-a-home-computer)
* Install: 
  * `sudo apt-get install openssh-client` 
  * `sudo apt-get install openssh-server` 
* Configure 
  * script [init.sh](https://github.com/ErikEkstedt/.files/blob/master/ssh/init.sh)

### SSHFS
Mount a ssh connection to a local directory to more easily access and copy/paste many files.
* [tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-sshfs-to-mount-remote-file-systems-over-ssh)
* Install: `sudo apt install sshfs`

### Securecopy, SCP

* [tutorial](http://www.hypexr.org/linux_scp_help.php)
example
```bash
scp your_username@remotehost.edu:foobar.txt /some/local/directory
```

## WakeOnLan
All desktops with connected power and ethernet should have WakOnLan. Possible in KTH?

## Synergy

[Download Synergy](https://sourceforge.net/projects/synergy-stable-builds/?source=typ_redirect)

Needed to install this library on Desktop Kubuntu 18.04 Kde 5.12.5
```bash
sudo apt-get install libxrandr2:i386
```

## Tmuxinator

[Tmuxinator folder](https://github.com/ErikEkstedt/.files/tree/master/tmuxinator)

1. Install tmuxinator
2. Run shellscript to link templates


```bash
gem install tmuxinator
sh ~/.files/tmuxinator/init.sh
```


