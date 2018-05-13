#!/bin/bash

# Starts tmux if tmux is not opened
if [ "$TMUX" = "" ]; then 
	tmux new
fi

session="Blog"

tmux rename-session $session

tmux new-window -t $session:1
tmux send-keys -t $session:1 "nodemon app.js" Enter
tmux rename-window -t $session:1 "Node"

tmux select-window -t $session:0
tmux rename-window -t $session:0 "Vim"
tmux send-keys -t $session:0 "vim" Enter


google-chrome --new-window http://localhost:3003
