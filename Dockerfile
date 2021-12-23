# syntax=docker/dockerfile:1
FROM ubuntu:latest
ADD gotty_linux_amd64.tar.gz /usr/local/bin/
ADD .gotty /home/
ENV TERM=xterm-256color
RUN apt-get -y update && \
    apt install -y curl vim ranger git && \
    curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim && \
    curl -fLo /etc/vim/vimrc.local --create-dirs https://raw.githubusercontent.com/seanwarman/vimrc/master/vimrc
