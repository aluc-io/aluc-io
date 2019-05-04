---
title: git filter-branch 로 모든 커밋 변경하기
subTitle: git filter-branch, reflog, force push
category: guide
published: true
---

git 은 분산 버전 컨트롤 시스템이다. 원격 저장소에 `push` 하여 공유하기 전에는
함께 협업하는 다른 동료에게 아무 영향을 끼치지 않으면서 이미 한 커밋을 변경 할
수 있는 장점이 있다.  최근 커밋을 변경하는 것은 `git commit --amend` 혹은 이전
커밋 한두개를 변경할 땐 `git rebase -i <SHA>` 명령으로 할 수 있다.

하지만 한두개의 커밋이 아닌 수백개 이상의 커밋을 일정한 규칙에 따라 변경하고
싶을땐 어떻게할까? 실무에서 `commit author` 의 이름을 일괄 변경하고 싶을때,
커밋해서는 안되는 기밀 정보나 민감 정보를 삭제하고 싶을 때 주로 필요하다.

# 1. Commit author 의 정보를 일괄 변경
아래는 commit author 이메일이 `schacon@localhost` 인 커밋을 모두 찾아서 이름과
이메일을 각각 `Scott Chacon`, `schacon@example.com` 으로 변경하는 명령어이다.

```sh
$ git filter-branch --commit-filter '
        if [ "$GIT_AUTHOR_EMAIL" = "schacon@localhost" ];
        then
                GIT_AUTHOR_NAME="Scott Chacon";
                GIT_AUTHOR_EMAIL="schacon@example.com";
                git commit-tree "$@";
        else
                git commit-tree "$@";
        fi' HEAD
```

찾을 이메일과 변경할 author 정보를 parameterize 하기위해 아래와 같이 변경 할 수
있다.
```sh
$ ASIS_EMAIL=schacon@localhost
$ TOBE_EMAIL=me@aluc.io
$ TOBE_NAME=aluc
$ git filter-branch --commit-filter "
        if [ \"\$GIT_AUTHOR_EMAIL\" = \"$ASIS_EMAIL\" ];
        then
                GIT_AUTHOR_NAME=\"$TOBE_NAME\";
                GIT_AUTHOR_EMAIL=\"$TOBE_EMAIL\";
                git commit-tree \"\$@\";
        else
                git commit-tree \"\$@\";
        fi" HEAD
```

조심해야할 것은 `GIT_AUTHOR_EMAIL` 은 명령어 실행시 사용되는 환경변수가 아닌
filter-branch 프로세스 안에서 커밋 하나 하나를 비교할때 사용되는 환경변수이므로
`"$GIT_AUTHOR_EMAIL"` 란 스트링이 현재 환경변수로 치환되지 않고 그대로
들어가야해서 `\"\$GIT_AUTHOR_EMAIL\"` 로 사용했고, `ASIS_EMAIL` 등 은 바로
윗줄에서 셋팅해준 환경변수로 치환되어야 하는 값이기 때문에 `\"$ASIS_EMAIL\"` 로
사용했으며, `--commit-filter` 다음에 single quote`'` 대신 double quote`"` 를 사용했다.

# 2. Remove secret information
`filter-branch` 는 필터를 정의하고 정의한 필터에 커밋 하나하나를 통과시켜 새로운
커밋으로 변경해준다. 필터의 종류는 여러가지 있고 위에서는 `--commit-filter` 를
사용했으며 다른 필터 종류는 [git 공식 사이트 문서][official_guide]에 잘 설명되어
있다. 이번에는 실수로 커밋해서는 안되는 Passwords, Credentials, Private data
등을 커밋했을때 `--tree-filter` 를 사용해 모든 커밋을 조사하여 흔적을 지우는
방법을 알아보자:

```sh
git filter-branch --tree-filter 'rm -f mypassword.txt' --prune-empty HEAD
```

# 3. Reflog
`filter-branch` 를 실수하여 명령어 실행 전으로 되돌리고 싶다면 `reflog` 를 사용
할 수 있다. git 은 `commit`, `merge`, `rebase`, `filter-branch` 등 HEAD 가 변경
될 때마다 롤백을 위해 메모를 해둔다.  복잡하고 어려운 명령을 과감하게 try 할 수
있게 해주는 git 의 장점 중 하나이다.

```sh
$ git reflog
e779915 HEAD@{3}: filter-branch: rewrite
13cab4f HEAD@{4}: commit: update readme.md
f270b51 HEAD@{5}: commit: add readme.md
563ada8 HEAD@{7}: commit: init
```

`filter-branch` 이후 `13cab4f` 에서 `e779915` 으로 변경되었다. git 은
[hash-tree][hashtree] 구조로 되어있어 트리의 root 에 해당하는 HEAD 의 SHA 가
정해지면 과거 모든 히스토리의 SHA 도 함께 정해지다. 따라서 몇개의 이전 커밋이
변경되었는지 관계없이 아래 `reset` 명령어로 완벽하게 `filter-branch` 이전
형상으로 돌아 갈 수 있다.

```sh
$ git reset --hard 13cab4f
```

`reflog` 에 저장된 SHA 목록들은 현재 로컬 저장소에서만 임시로 관리되는 데이터
이다. push 할때 브랜치나 태그등으로 참조 할 수 없는 스냅샷(SHA) 들은 push
되지 않으며 저장소마다 서로 다른 `reflog` 목록을 가지고 있음에 주의하자.

# 4. Force push
`push` 전의 로컬 커밋을 얼마든지 변경 할 수 있다는 것은 git 의 큰 장점이다.
다만 그렇지 못할때가 있다. 실수로 원격 `master` 브랜치에 push 한 후 패스워드가
커밋 된 것을 알아 버렸거나 할 때가 많다. 어느 정도 규모와 체계가 있는
프로젝트라면 중간 통합 브랜치에서 코드리뷰시 발견되어 처리가 되겠지만, 작은
규모의 프로젝트에선 충분히 `master` 브랜치에 잘못된 커밋이 발생할 가능성이 있다.

`force push` 를 사용하여 해결 할 수 있는데, 이미 잘못된 커밋을 `fetch` 받은 모든
동료들이 이를 인지하여 모든 개인의 로컬 저장소에서도 `reset` 또는 다시 `clone`
하도록 알려주어야 한다. 또한 gitlab, github 를 사용한다면 이슈와 MR(PR)
페이지에서 특정 commit 링크가 많이 사용되는데, 이런 commit 들의 SHA 가 변경되면
이런 링크들 또한 모두 깨지게 된다. 이런 문제들 때문에 default 브랜치인 master
브랜치에 `force push` 를 하는 것을 쉽게 결정 해선 안된다. API KEY 가
노출되었다면 키를 폐기하는 방법이 더 현명 할 수 있다.

# 5. BFG Repo-Cleaner
위의 내용만으로도 작은 규모의 프로젝트에서 사용하기에는 큰 문제가 없다. 하지만
커밋이 1만개가 넘어가는 큰 규모의 프로젝트에서 `filter-branch` 를 수행하면
시간이 굉장히 오래 걸릴 수 있는데, [BFG Repo-Cleaner][bfg] 를 사용하면 더 빠르고
간편하게 원치않는 데이터를 삭제할 수 있다. 많은 기능을 지원하는 `filter-branch`
와는 달리 **삭제** 기능만 지원하며 이것에 최적화된 프로그램으로 `filter-branch`
와 비교했을때 아래 동영상과 같이 속도가 수십배 이상 차이가 난다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/Ir4IHzPhJuI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

# References
- https://help.github.com/articles/removing-sensitive-data-from-a-repository/
- http://ohyecloudy.com/pnotes/archives/1994/
- https://git-scm.com/docs/git-filter-branch


[bfg]: https://rtyley.github.io/bfg-repo-cleaner/
[official_guide]: https://git-scm.com/docs/git-filter-branch
[hashtree]: https://ko.wikipedia.org/wiki/해시_트리
