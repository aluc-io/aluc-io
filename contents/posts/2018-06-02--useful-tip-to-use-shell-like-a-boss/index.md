---
title: useful tip to use shell like a boss
subTitle: useful tip to use shell like a boss
category: guide
published: false
---

GUI 는 흔히 CLI 보다 쉽다는 인식이 있다. GUI, CLI 모두 괜찮은 툴이 있다면 맞는
말 일 수 있고 어떻게 평가 하고 무엇을 사용하든 개인의 취향의 문제이다. 다만
프로그램을 만들 때 대부분 CLI 를 기본으로 먼저 만들고 CLI 기반으로 GUI 가
개발된다. 이러한 이유로 CLI 가 GUI 보다 기능이 많고 안정적인 경우가 많으며, GUI
는 편의를 위해 유저가 컨트롤 할 수 없는 블랙박스 부분이 포함 될 수 있으며 화면을
하나하나 캡춰하거나 동영상을 찍어야 하기 때문에 가이드를 제작하기도 힘이든다.
GUI 로는 작업을 자동화 시키기도 어렵다. 이러한 이유로 CLI 를 선호하는데 CLI
사용시 생산성을 올려 줄 수 있는 툴에 대해 소개한다.

# oh-my-zsh
우분투와 Mac OS 의 기본 shell 프로그램은 `bash` 이다. `zsh` 을 얼마전부터
쓰게되었는데 여기 소개하는 이유는 `zsh` 의 우수함 보다는 `oh-my-zsh` 의 우수함
때문인데 특히 플러그인 지원으로 필요한 기능을 플러그인으로 설치, 활성화 하기
매우 쉽게 때문이다.

## auto-suggestion
우리가 컴퓨터를 이용 할때 GUI 나 CLI 어떤 것을 사용하든 반복적으로 하는 일이
생각 보다 많다. 프로젝트 파일을 확인하기 위해 특정 디렉토리 경로로 이동한다던지
무언가를 확인하기 위해 방금 한 명령을 다시 한번 실행한다던지. 최근 CLI 로 내린
명령어를 기억해서 자동완성을 제안해주는 툴이다. 예를들어 hosts 파일을
수정하기위해
```sh
$ vi /etc/hosts
```
위와 같은 명령을 했다면 이후에 `vi /e` 까지만 타이핑 해도 내가 실행하고자 하는
명령어를 높은 확률로 제안해준다. 아래 설명할 `fasd` 와 함께 CLI 사용시
퍼포먼스를 크게 높여주는 툴이다.

## vi-mode
명령어를 타이핑 할때 vim editor 의 command mode 에서 사용하는 키들을 사용 할 수
있게 해준다. 긴 명령어를 타이핑 하다 중간에 오타를 발견했을때, 화살표키로 한칸
한칸 이동 해 본 적이 있을 것이다. 이에 불편을 느낀다면 vi-mode 를 사용하자.
명령어 타이핑 중 `shift+tab` 키를 통해 vi mode 로 진입 할 수 있으며 프롬프트
우측에 현재 vi-mode 라는 빨간 표시가 나타난다.

## zsh-syntax-highlighting


# jq
`json` format 의 output 을 파싱하거나 가공할 수 있는 툴이다.  `json` 이 아닌
일반 output 의 경우 `awk` 라는 툴로 할 수 있으나 문법도 어렵고 공백에 의존해서
파싱하기 때문에 조금만 output 이 달라져도 사용 할 수 없다는 단점이 있다.

# tree
파일, 디렉토리 구조를 가독성 높은 UI 로 볼 수 있게 해준다.  개발환경 문서 작성시
디렉토리 구조를 설명할 때 많이 사용하는 툴이다.

```sh
$ tree -L 2
.
├── LICENSE
├── README.md
├── README.original.md
├── content
│   ├── meta
│   ├── pages
│   ├── parts
│   └── posts
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── gatsby-ssr.js
├── index.html
├── main.tf
├── node_modules
│   ├── @babel
│   ├── @material-ui
```

# !!
`!!` 는 바로 전 실행했던 명령어로 치환된다.  보통 `sudo` 사용을 빼먹고 실행한
명령어 다음에 주로 사용한다.

```sh
$ vi /etc/hosts
$ sudo !!
```

# vim 기본셋팅
shell 을 쓴다면 쉘 외부의 GUI 에디터를 사용 하는 것보다 vim 을 사용 하는 것이
좋을때가 많다. 특히 SCM 사용시 커밋 메시지를 작성할 때나 `git rebase -i` 를
할 때, 원격 서버에서 간단하게 파일을 편집 할 때 vim 을 사용하면 좋은데,
이 때 알아두면 좋은 기본중의 기본 vim 설정이다.

```
:set hls
```


# the fuck

# fzf

# direnv

# watch

# rg

# fasd

# cat <<a.js>>EOF

# ' " 구분

# neasted 명령어

# /bin/sh -c ""
traffic watch 구문에서 따오자

# source .

# 



https://subicura.com/2017/11/22/mac-os-development-environment-setup.html
https://www.cybrary.it/0p3n/command-line-interface-cli-vs-graphical-user-interface-gui/

