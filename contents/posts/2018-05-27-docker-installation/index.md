---
title: docker 설치하기
subTitle: docker 설치 및 프록시 셋팅
category: guide
published: true
---

Docker 설치시 매번 인터넷 검색을 하다보니 매번 조금씩 다른 가이드를 보게되어
정리를 위해 작성.

# 1. 설치

## 1.1. docker install script 사용
현재 리눅스 배포판에 맞는 Docker 를 찾아서 설치해주는 자동 스크립트를
사용하는 방법이 가장 쉽다.

```sh
$ curl -fsSL https://get.docker.com/ | sudo sh -
```

## 1.2. binary 사용

https://download.docker.com/linux/ 경로를 인터넷으로 열어 리눅스 배포판에 맞는
바이너리를 다운로드 받자. 예를들어 ubuntu 16.04 를 사용하고 현재 stable 한 최신 버전인
`18.03.1` 의 경우는 아래와 같다.

```sh
https://download.docker.com/linux/ubuntu/dists/xenial/pool/stable/amd64/docker-ce_18.03.1~ce-0~ubuntu_amd64.deb
```

위 경로 바이너리 파일을 다운받고 설치하는 예:

```sh
$ wget https://download.docker.com/linux/ubuntu/dists/xenial/pool/stable/amd64/docker-ce_18.03.1~ce-0~ubuntu_amd64.deb
--2018-05-27 13:20:17--  https://download.docker.com/linux/ubuntu/dists/xenial/pool/stable/amd64/docker-ce_18.03.1~ce-0~ubuntu_amd64.deb
Resolving download.docker.com (download.docker.com)... 52.85.125.222, 52.85.125.29, 52.85.125.145, ...
Connecting to download.docker.com (download.docker.com)|52.85.125.222|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 34045202 (32M) [binary/octet-stream]
Saving to: ‘docker-ce_18.03.1~ce-0~ubuntu_amd64.deb’

docker-ce_18.03.1~ce-0~ubuntu_a 100%[======================================================>]  32.47M  9.96MB/s    in 3.2s

2018-05-27 13:20:23 (10.0 MB/s) - ‘docker-ce_18.03.1~ce-0~ubuntu_amd64.deb’ saved [34045202/34045202]
```

```sh
$ sudo dpkg -i docker-ce_18.03.1~ce-0~ubuntu_amd64.deb
(Reading database ... 166009 files and directories currently installed.)
Preparing to unpack docker-ce_18.03.1~ce-0~ubuntu_amd64.deb ...
Unpacking docker-ce (18.03.1~ce-0~ubuntu) over (17.03.2~ce-0~ubuntu-xenial) ...
dpkg: dependency problems prevent configuration of docker-ce:
 docker-ce depends on libseccomp2 (>= 2.3.0); however:
  Version of libseccomp2:amd64 on system is 2.2.3-3ubuntu3.

dpkg: error processing package docker-ce (--install):
 dependency problems - leaving unconfigured
Processing triggers for systemd (229-4ubuntu21.1) ...
Processing triggers for ureadahead (0.100.0-19) ...
Processing triggers for man-db (2.7.5-1) ...
Errors were encountered while processing:
 docker-ce
```

`dpkg -i` 명령어로 설치 시도시 dependency 문제가 발생할 수 있다. 위는
`libseccomp2` 의 버전이 낮아서 발생한 문제다. 로그를 잘 읽어보고 문제되는
라이브러리를 `apt-get` 명령어로 설치해주자:
```sh
$ sudo apt-get install libseccomp2
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following packages were automatically installed and are no longer required:
  linux-headers-4.4.0-112 linux-headers-4.4.0-112-generic linux-headers-4.4.0-116 linux-headers-4.4.0-116-generic
  linux-headers-4.4.0-119 linux-headers-4.4.0-119-generic linux-headers-4.4.0-71 linux-headers-4.4.0-71-generic
  linux-image-4.4.0-112-generic linux-image-4.4.0-116-generic linux-image-4.4.0-119-generic linux-image-4.4.0-71-generic
Use 'sudo apt autoremove' to remove them.
The following packages will be upgraded:
  libseccomp2
1 upgraded, 0 newly installed, 0 to remove and 110 not upgraded.
1 not fully installed or removed.
Need to get 38.7 kB of archives.
After this operation, 28.7 kB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu xenial-updates/main amd64 libseccomp2 amd64 2.3.1-2.1ubuntu2~16.04.1 [38.7 kB]
Fetched 38.7 kB in 6s (6,126 B/s)
(Reading database ... 195259 files and directories currently installed.)
Preparing to unpack .../libseccomp2_2.3.1-2.1ubuntu2~16.04.1_amd64.deb ...
Unpacking libseccomp2:amd64 (2.3.1-2.1ubuntu2~16.04.1) over (2.2.3-3ubuntu3) ...
Processing triggers for libc-bin (2.23-0ubuntu10) ...
Setting up libseccomp2:amd64 (2.3.1-2.1ubuntu2~16.04.1) ...
Setting up docker-ce (18.03.1~ce-0~ubuntu) ...
Installing new version of config file /etc/init.d/docker ...
Processing triggers for libc-bin (2.23-0ubuntu10) ...
Processing triggers for systemd (229-4ubuntu21.1) ...
Processing triggers for ureadahead (0.100.0-19) ...
```

```sh
$ sudo dpkg -i docker-ce_18.03.1~ce-0~ubuntu_amd64.deb
(Reading database ... 195259 files and directories currently installed.)
Preparing to unpack docker-ce_18.03.1~ce-0~ubuntu_amd64.deb ...
Unpacking docker-ce (18.03.1~ce-0~ubuntu) over (18.03.1~ce-0~ubuntu) ...
Setting up docker-ce (18.03.1~ce-0~ubuntu) ...
Processing triggers for systemd (229-4ubuntu21.1) ...
Processing triggers for ureadahead (0.100.0-19) ...
Processing triggers for man-db (2.7.5-1) ...
```

잘 설치가 된 것 같다. 확인하자:
```sh
$ docker version
Client:
 Version:      18.03.1-ce
 API version:  1.37
 Go version:   go1.9.5
 Git commit:   9ee9f40
 Built:        Thu Apr 26 07:17:20 2018
 OS/Arch:      linux/amd64
 Experimental: false
 Orchestrator: swarm

Server:
 Engine:
  Version:      18.03.1-ce
  API version:  1.37 (minimum version 1.12)
  Go version:   go1.9.5
  Git commit:   9ee9f40
  Built:        Thu Apr 26 07:15:30 2018
  OS/Arch:      linux/amd64
  Experimental: false
```

생각보다 어렵지 않다. 특정 버전의 docker 를 설치하고 싶을때 좋은 방법이기도
하다.

## 1.3. yum 사용 (for Amazon linux)

```sh
$ sudo yum update -y
$ sudo yum install -y docker
$ sudo service docker start
$ sudo usermod -a -G docker ec2-user
```

[AWS 공식 가이드][amazon_linux] 에 있는 방법인데 오래된 버전이 설치된다.

# 2. user 를 docker 그룹으로 추가
docker 사용시 매번 `sudo` 를 사용하는 것보다 docker 를 사용할 user 를 docker
그룹에 추가해 `sudo` 없이 사용하는게 편리하다. 예를들어 `ubuntu` user 를 docker
그룹에 추가하기 위해 아래 명령어를 사용한다:

```sh
$ sudo usermod -aG docker ubuntu
```

추가한 뒤 바로 sudo 없이 `docker info` 등의 명어를 실행하면 여전히 퍼미션 관련
오류가 나는데 shell logout 후 재 접속한 이후에 다시 시도하면 된다. 해당 user 는
Host OS 의 root 유저와 같은 권한을 얻게되어 보안이 취약해 질 수 있으니
주의해야한다. 아래 가이드를 참고하자:

- https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface

# 3. 프록시 셋팅

## 3.1. 리눅스 버전 별 프록시 셋팅

### 3.1.1 Ubuntu 14.04 기준:
```sh
$ export http_proxy="http://web-proxy.corp.xxxxxx.com:8080/"
$ export https_proxy="https://web-proxy.corp.xxxxxx.com:8080/"
$ service docker restart
```

### 3.1.2 Ubuntu 16.04 기준:
```sh
$ sudo mkdir -p /etc/systemd/system/docker.service.d
$ sudo vi /etc/systemd/system/docker.service.d/http-proxy.conf
```

`http-proxy.conf` 을 아래를 참고하여 작성:
```sh
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:80/"
Environment="HTTPS_PROXY=http://proxy.example.com:80/"
```

If you have internal Docker registries that you need to contact without proxying
you can specify them via the `NO_PROXY` environment variable:
```sh
Environment="NO_PROXY=localhost,127.0.0.1,docker-registry.somecorporation.com"
```

이후에 설정을 reload 하고 docker daemon 을 재시작 해줘야한다:
```sh
$ sudo sysetmctl daemon-reload
$ sudo systemctl restart docker
```

## 3.2. 프록시 셋팅 확인

```sh
$ docker info

...
HTTP Proxy: http://proxy.mycompany.com:8080/
HTTPS Proxy: http://proxy.mycompany.com:8080/
No Proxy: localhost, company-registry.com
...
```

## 3.3. 불행한 프록시 환경
위의 프록시 셋팅은 Docker daemon 이 인터넷으로부터 Docker Image 를 pull, push 할
때 사용할 프록시 셋팅이며 Docker Container 실행환경내의 프록시 셋팅은 아니다.
Container 를 실행하고 컨테이너 안에서 인터넷에 접속하는 프로그램을 사용할 때마다
별도의 프록시 셋팅을 해야하는데, 프로그램마다 프록시 셋팅 방법이 달라 ~~암이
유발 될 수 있으며~~ 매우 귀찮은 작업이고 프록시 설정을 지원하지 않는 프로그램도
다수 있어 때론 프록시 환경이 개발 환경의 큰 장벽이 되기도 한다. ~~스스로 프록시
없이 보안을 지킬 자신이 있다면 보안부서에 프록시 예외 신청을 하자!!~~

# References
- https://subicura.com/2017/01/19/docker-guide-for-beginners-2.html
- https://docs.docker.com/config/daemon/systemd/#httphttps-proxy
- https://stackoverflow.com/questions/26550360/docker-ubuntu-behind-proxy
- https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html#install_docker

[amazon_linux]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html#install_docker
