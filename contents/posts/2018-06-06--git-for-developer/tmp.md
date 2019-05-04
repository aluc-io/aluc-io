
`아무커밋` 을 추가한 후 push 해보자. commit 하기전
로그, 커밋 후 push 하기전 로그, push 후 로그의 변화를 보면서 진행해보자:
```sh
$ git log --graph --oneline --all
*   f9d7bb8 (me) Merge branch 'other' into me
|\
| * c92baa4 (other) change of other
* | d7e1e26 change of me
|/
* e920158 (HEAD -> master, origin/master) add some.info
*   8928723 Merge branch 'pick'
|\
| * 5f6754b (pick) change log
* | 4373443 add user
|/
* dadbe71 add pick.js, add one user
* d1bb054 add print.js
* 2533112 add userList
* 0760b3f first commit
```

commit 후 log 를 확인하자:
```sh
$ git add .
$ git commit -m "아무커밋"
$ git log --graph --oneline --all
* 4b9d2e6 (HEAD -> master) 아무커밋하나
| *   f9d7bb8 (me) Merge branch 'other' into me
| |\
| | * c92baa4 (other) change of other
| |/
|/|
| * d7e1e26 change of me
|/
* e920158 (origin/master) add some.info
*   8928723 Merge branch 'pick'
|\
| * 5f6754b (pick) change log
* | 4373443 add user
|/
* dadbe71 add pick.js, add one user
* d1bb054 add print.js
* 2533112 add userList
* 0760b3f first commit
```

`아무커밋` 때문에 graph 가 복잡해졌고 `origin/master` upstream
브랜치의 위치는 여전히 `e920158` 이다. push 한뒤 log 를 확인하자:
```sh
$ git push
Counting objects: 3, done.

$ git log --graph --oneline --all
* 4b9d2e6 (HEAD -> master, origin/master) 아무커밋
| *   f9d7bb8 (me) Merge branch 'other' into me
| |\
| | * c92baa4 (other) change of other
| |/
|/|
| * d7e1e26 change of me
|/
* e920158 add some.info
*   8928723 Merge branch 'pick'
|\
| * 5f6754b (pick) change log
* | 4373443 add user
|/
* dadbe71 add pick.js, add one user
* d1bb054 add print.js
* 2533112 add userList
* 0760b3f first commit
```

push 를 한 뒤에야 비로소 upstream branch 인 `origin/master` 브랜치가 `4b9d2e6`
위치로 이동하였다. push 를 하여 원격 저장소의 형상을 변경했고 그 형상이 local 에
있는 upstream 브랜치로 싱크된 것이다.


















me 브랜치는 `e920158` 위치에서 master 브랜치와
분기되었다. 즉 me 브랜치 입장에서는 `e920158` 를 base 로 삼고 있는 것이다. 이
base 로 부터 me 브랜치에 새로운 커밋들이 추가될 때 master 브랜치에도 새로운
커밋 `4b9d2e6` 이 추가된 것인데, rebase 를 하여 me 브랜치의 base 를 기존
`e920158` 에서 `4b9d2e6` 로 새로 잡아 보자.

```sh
$ git checkout me            # base 를 다시 잡을 브랜치로 이동하여 수행한다.
$ git rebase master
First, rewinding head to replay your work on top of it...
Applying: change of me
Applying: change of other
Using index info to reconstruct a base tree...
M	some.info
Falling back to patching base and 3-way merge...
Auto-merging some.info
CONFLICT (content): Merge conflict in some.info
error: Failed to merge in the changes.
Patch failed at 0002 change of other
The copy of the patch that failed is found in: .git/rebase-apply/patch

Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".
```

merge 와 마찬가지로 rebase 수행 시에도 3-way 방식으로 merge 가 진행되며 이때
충돌이 날 수 있는데,


그럼 이제 upstream 브랜치가 생성 된 것이다. 확인해보자:
```:
$ git branch --all
* master
  me
  other
  pick
  remotes/origin/master
```






우리는 위에서 `e920158` 위치에서 me, other 브랜치를 만들고 me 브랜치로 other
브랜치를 머지 시켰었다. 하지만 master 브랜치만 push 했기 때문에 me 브랜치의
내용은 포함이 되지 않았는데 이를 포함시켜 다시 push 하기위해 `merge` 해보자:
```sh
$ git merge me
$ git log --graph --oneline --all
*   cfea132 (HEAD -> master) Merge branch 'me'
|\
| *   f9d7bb8 (me) Merge branch 'other' into me
| |\
| | * c92baa4 (other) change of other
| * | d7e1e26 change of me
| |/
* | 4b9d2e6 (origin/master) 아무커밋하나
|/
* e920158 add some.info
*   8928723 Merge branch 'pick'
|\
| * 5f6754b (pick) change log
* | 4373443 add user
|/
* dadbe71 add pick.js, add one user
* d1bb054 add print.js
* 2533112 add userList
* 0760b3f first commit
```

조금 복잡해진 graph 모양이다. 사실 이 정도라면 용납되지 않을 정도로 복잡하진
않지만 굳이 이런 머지 히스토리 graph 를 유지할 특별한 이유가 없다면 `merge` 하기
전 `rebase` 를 수행하여 **3-way** 방식이 아닌 **fast-forward** 방식으로 merge
하는 것이 그래프를 깔끔하게 만들어 주기 때문에 좋다. merge 전으로 되돌리기 위해
먼저 `reset` 명령어를 사용해보자:
```sh
$ git reset HEAD^ --hard
$ git log --graph --oneline --all
* 4b9d2e6 (HEAD -> master, origin/master) 아무커밋하나
| *   f9d7bb8 (me) Merge branch 'other' into me
| |\
| | * c92baa4 (other) change of other
| |/
|/|
| * d7e1e26 change of me
|/
* e920158 add some.info
*   8928723 Merge branch 'pick'
|\
| * 5f6754b (pick) change log
* | 4373443 add user
|/
* dadbe71 add pick.js, add one user
* d1bb054 add print.js
* 2533112 add userList
* 0760b3f first commit

$ git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```







# checkout -- file
checkout 은 HEAD 를 위치를 특정 커밋으로 이동시켜 파일들의 형상을 특성 스냅샷
시점으로 변경시켰다. 이 checkout 명령어로 프로젝트 파일 전체의 형상 뿐만 아니라
파일 단위로 수행 할 수도 있는데

```sh
$ git checkout <SHA> -- <filepath>
```

`--` 이 2개의 dash 가 중요하다. 이게 없다면 git 에서는 뒤의 filepath 가
branch 이름인지 filepath 인지 알 수 없게 되기 때문에 filepath 라는 것을
알려주기 위해 `--` 가 들어가야한다. `<SHA>` 를 생략하면 `HEAD` 로 간주되어
현재 수정 파일의 수정사항을 취소 시킬때 자주 사용한다.

특정 커밋의 형상으로 

git show HEAD:user3.info



