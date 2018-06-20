# Computer Setup

A post containing an interface to my computer setup. This is the starting point for a fresh computer initialization. This repo contains all the config files, linkers and developer tools.

Full installation can be found in [README](https://github.com/ErikEkstedt/.files/blob/master/README.md) but is essentially using these tools:
1. [Dotfiles](https://github.com/ErikEkstedt/.files) repository
2. Setup/workflow heavily depends on Vim and tmux.
3. SSH
4. Synergy
5. Mycroft 

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


