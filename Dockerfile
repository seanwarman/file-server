# syntax=docker/dockerfile:1
FROM ubuntu:latest
ENV TERM=xterm-256color
RUN apt-get -y update && \
    apt install -y curl vim ranger git sudo
    # git clone https://github.com/seanwarman/vimrc.git ~/.vim && \
    # touch ~/.vimrc && \
    # echo 'runtime vimrc' > .vimrc && \
    # curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
