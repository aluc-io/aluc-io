---
title: Serverless framework
subTitle: Serverless framework
category: guide
published: true
---

# Serverless Framework with Nodejs

소에게 이름을 지어주는 순간 그 사람은 그 소를 절대로 도축할 수 없다고 한다.
어떤 대상에 이름이 생기면 바라보는 시선이 달라진다. 농장의 소 한마리에
**스칼렛** 이라는 이름을 지어주고 그 소를 잡아먹게 되면 단순한 **소고기**가
아니라 **스칼렛 고기**가 되기 때문이다. 그래서 우리는 도축장의 소들을 이름이
아니라 관리번호로 부른다. 이렇게 몰개성화된 동물들은 각자의 개성을 지닌 고유한
개체들로 간주되지 않는다.  관리하기 편하며 도축할 때의 불편한 마음도
희미해진다.

반면 애완동물은 어떨까? 애완동물을 만났을때 가장 먼저 하는 일은 이름
지어주기다. 같은 강아지를 키우더라도 모두 다르다. 이름이 다르고 털 색깔이나
무늬가 다르고 얼굴도 다르고 울음 소리도 다르고 식성도 성격도 다르다. 애완동물이
아프면 주인의 마음도 아프고 큰 치료비를 감수하더라도 병원에 데려가 건강을
원래대로 회복시킨다.

뭔 ~~개~~소린가 하겠지만 IT 인프라 자원을 관리하는데에도 같은 논리가 적용된다.

On-premise 환경에서의 서버 설비투자 비용과 프로비저닝 시간을 고려하면 가능한
하나의 서버를 오래 사용하는 계획을 세워야한다. 서버에 문제가 생기면 큰 비용이
들더라도 고쳐야하며 그렇기 때문에 서버에서 뭔가를 할 땐 그 환경에 익숙한 전문
인력의 섬세한 작업이 필요하다. 이러다 보니 각각의 서버들에 이름을 붙여서 관리
한다. A-Service-Web, B-Service-WAS, DB, Firewall Server 등. 이러한 서버들의
이름과 특징들을 **상태** 라고 하며 상태 관리가 필요한 자원을 **Stateful**
자원이라 한다.

Cloud 의 등장은 애완동물(**Pets**) 처럼 관리하던 인프라 자원을 소
무리(**Cattle**) 처럼 취급하는 패러다임의 변화를 주었다. 이제 설비투자 비용을
고려하지 않고 오직 운영비용만 고려하면 되었다. 서버는 언제라도 폐기하고 새로
생성 할 수 있었기 때문에 서버가 아프면 들어가서 고치는 것이 아니라 폐기하고
새로운 서버를 생성하는 방식으로 효율을 높였다. Docker 와 같은 컨테이너 사용으로
서버의 상태를 관리할 필요도 없어졌다. 많은 **Stateful** 자원이 **Stateless**
자원으로 변한 것이다.

> 물론 Stateless 한 애플리케이션을 위해 local storage, session 등을 사용하지
> 않아야 하며 수평 확장을 고려하여 설계 해야 한다. 이러한 설계가 어려운 DB 와
> 같은 자원은 여전히 **Stateful** 하게 관리되기도 한다.

## Insects 의 등장
곤충이 나타났다. **Pets** 과 **Cattle** 뿐만 아니라 **Insects** 처럼 취급되는
인프라 자원이 등장했는데 필요한 시간 동안만 존재했다 소멸하는 자원을 가르킨다.
또 다른 말로는 **이벤트 드리븐 컴퓨팅** 이다.  대표적인 예가 바로 [AWS
Lambda][aws_lambda] 이다. Lambda 를 트리거 하는 이벤트가 발생하면 초기화 된 후
일반적으로 1~5초 정도로 짧게 실행된 후 소멸되는데 마치 곤충인 하루살이와 같이
매우 짧은 생명주기를 갖는다. 요금은 실행되는 시간 동안만 밀리세컨드 단위로
청구된다. API 백엔드, 일회성 처리 작업 및 기타 애플리케이션에 매우 유용하다.

**Insects** 의 장점은 **Serverless** 이다. 사실 서버는 어딘가에 있지만 AWS 와
같은 클라우드 벤더사에서 서버를 관리해줘서 개발/운영자가 관리할 서버가 없다는
의미이며 애플리케이션 코드만 관리하여 서비스를 구성 할 수 있다.


# Serverless Architecture
AWS Lambda 뿐 만 아니라 AWS SNS, SES, SQS, DynamoDB 등 모두 위의 특징을
만족하는 **Serverless** 자원들이며 BaaS(Backend as a Service) 또는
FaaS(Function as a Service) 들이다. 이러한 자원들을 활용한 **Serverless
Architecture** 를 설계는 아래와 같은 장점이 있다.

1. 애플리케이션 코드만 관리한다. 다음을 모두 Cloud 벤더사에서 관리한다.
    - server and operating system maintenance
    - high-availability
    - capacity provisioning
    - automatic scaling
    - monitoring and logging
2. 언제든지 호출하면 실행이 보장된다.
3. 실행되는 동안만 과금된다.

# Serverless Framework
[Serverless Framework][serverless_framework] 는 [AWS Lambda][aws_lambda], [API
Gateway][aws_apigateway] 와 같은 **Serverless** 자원들을 사용하여 **Serverless
Architecture** 를 쉽게 설계, 구현, 배포, 관리 할 수 있게  해주는 툴이다. AWS
뿐만아니라 Google Cloud Platform, Azure 도 지원을 한다. 포스트에서는 AWS 에
대해서만 다룬다.

serverless 라는 용어는 **Serverless Framework** 라는 툴을 의미하기도 하며
**Serverless Architecture** 를 의미하기도 하는데 포스트에서는 전자의 의미로
언급 될 것이다.

평소 API Gateway 와 Lambda 를 AWS Web Console 을 통해 접해봤거나 혹은 어떤
서비스인지 대충 알고만 있어도 **Serverless Framework** 를 시작하기에 무리가
없다.  AWS Lambda 를 처음 들어봤다면 [Velopert 님의 AWS Lambda 로 하는 Hello
World!][velopert_lambda] 를 참고!

# Serverless 프로젝트 초기화 (feat. npx)
serverless 는 nodejs 로 개발되었다. [npm][npm] 이나 [yarn][yarn] 을 사용하여
global 영역에 [serverless package][sls_package] 를 설치하여 시작하는 것이
일반적이지만 global 영역을 더럽히는 것을 원하지 않는다면 [npx][npx] 를 사용해도
좋다. 이 포스트에서는 **npx** 를 사용한다. **npx** 는 **npm** `5.2.0` 이상 버전에
탑재되어 있다.

**serverless** 프로젝트를 생성하자:
```sh
$ npx serverless create --template aws-nodejs --path sls-hello-world
$ cd sls-hello-world
$ ls -l
total 16
-rw-r--r--  1 ssohjiro  staff   414 Sep  3 20:40 handler.js
-rw-r--r--  1 ssohjiro  staff  2892 Sep  3 20:40 serverless.yml
```

현재 디렉토리 아래 `sls-hello-world` 란 디렉토리가 생성되면서 기본 serverless
설정파일인 `serverless.yml` 과 Lambda function 에서 실행될 코드인 `handler.js`
가 생성된다.

`npx <command>` 를 실행하면 아래 우선순위대로 패키지를 찾아 실행시킨다.

1. 현재 디렉토리 아래에 있는 `node_modules/.bin` 디렉토리에서 패키지를 찾는다.
1. global 영역의 `bin` 디렉토리에서 패키지를 찾는다 (예:
   `~/.nvm/versions/node/v8.9.4/bin`)
1. 상위 디렉토리의 `node_modules/bin` 안의 패키지를 찾는다. 상위 디렉토리로
   올라가면서 반복.
1. 패키지를 찾지 못하면 인터넷(npm registry)에서 해당 패키지를 검색해 받아온뒤
   실행시킨다.

`global` 영역에 **serverless** 를 설치하면 서로 다른 **serverless** 버전을
사용하는 프로젝트를 동시에 진행하기 곤란하지만 `npx` 를 사용하면 각각의
프로젝트 디렉토리의 `node_modules/` 아래 설치된 **serverless**를 사용 할 수
있다. `package.json` 파일을 생성하고 프로젝트 디렉토리 아래 `node_modules/` 에
**serverless** 를 설치 하자.

```sh
$ yarn init
yarn init v1.7.0
question name (sls-hello-world):
question version (1.0.0):
question description:
question entry point (index.js):
question repository url:
question author:
question license (MIT):
question private:
success Saved package.json
✨  Done in 1.57s.

$ yarn add serverless

$ npx serverless -v
1.30.3

$ npx sls -v
1.30.3
```

`create` 명령어를 할 땐 `serverless` 를 인터넷에서 받아 실행시키느라 느렸지만
이번엔 `node_modules` 아래에 있는 것을 실행시키므로 빠르게 실행이 된다.
`npx serverless` 명령어가 길기 때문에 앞으론 shortcut 인 `sls` 를 사용한다.

## git init
`.gitignore` 파일을 아래와 같이 작성 한 뒤 프로젝트를 git 으로 관리하며 commit
하면서 진행할 것이다. 그래야 변경되는 부분에 집중 하기 좋고 나중에 무엇을
했는지 리뷰 할 때 좋다.

```
# .gitignore

# package directories
node_modules
jspm_packages

# Serverless directories
.serverless

# yarn
yarn.lock
yarn-*.log
```

`git init` 후 현재 형상을 커밋하자:
```
$ git init
$ git add .
$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   .gitignore
	new file:   handler.js
	new file:   package.json
	new file:   serverless.yml

$ git commit -m "initial commit"
[master (root-commit) bcf36cf] initial commit
 4 files changed, 138 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 handler.js
 create mode 100644 package.json
 create mode 100644 serverless.yml
```

# hello world
`aws-nodejs` 템플릿으로 프로젝트를 생성했기 때문에 `handler.js` 안에 기본적인
`hello` 핸들러 하나가 작성되어 있을 것이다. 대충 내용을 확인 한 뒤
`serverless.yml` 쪽을 살펴보자. 나중에 참고하며 작성하기 좋게 여러 설정들이
주석처리 되어 있다. 주석을 모두 걷어내면 아래와 같은 설정이 보인다:

```yml
service: sls-hello-world

provider:
  name: aws
  runtime: nodejs8.10

functions:
  hello:
    handler: handler.hello
```

[yaml][yaml] 은 인덴테이션에 민감한 문법이다. 휴먼 리더블한 yaml 로 설정을
작성하고 실행될때는 json 으로 변환되어서 실행되는데, 이러한 방식은 매우
쾌적하게 설정을 관리 할 수 있게 해준다. yaml 에 익숙하지 않아 디버깅이 필요할
때, `js-yaml` 을 사용하여 의도대로 yaml 이 json 으로 잘 변환되는지 확인 할 수
있다.

```sh
$ yarn add js-yaml --dev
$ npx js-yaml serverless.yml
{
  "service": "sls-hello-world",
  "provider": {
    "name": "aws",
    "runtime": "nodejs8.10"
  },
  "functions": {
    "hello": {
      "handler": "handler.hello"
    }
  }
}
```

`functions` property 는 각 Lambda function 1개를 의미한다. `hello` 란 id 의
Lambda function 을 생성하고 이 Lambda function 이 트리거 될 때 실행되는 코드를
**핸들러** 라고 하는데 `handler.js` 파일에서 `hello` 란 이름으로 export 되는
함수를 호출 하겠다는 의미이다. `hello` 란 id 는 serverless 에서 관리되는 id
이며 실제 Lambda function 에 배포되는 function name 은 service name, stage, id
의 조합으로 생성된다.

배포 할 때 AWS API 를 사용하기 때문에 권한 있는 AWS IAM 의 credential 이
필요하다. `.envrc` 파일을 작성 하자.

```
# .envrc
export AWS_ACCESS_KEY_ID=AKXXXXXXXXXXXXXXXXRA
export AWS_SECRET_ACCESS_KEY=kvxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxzZ
```

AWS API 사용하는 툴에선 보통 `AWS_DEFAULT_REGION` 이란 환경변수로 어떤 리전을
사용할지 결정하는데 `serverless` 에서는 `serverless.yml` 안의 `provider.region`
property 가 사용된다는 사실을 주의!

시크릿 정보가 형상관리에 추가되지 않도록 `.gitignore` 에 추가하는 것도 잊지말자. 
```diff
$ git diff .gitignore
diff --git a/.gitignore b/.gitignore
index 548cc6a..8b15f33 100644
--- a/.gitignore
+++ b/.gitignore
@@ -10,3 +10,5 @@ jspm_packages
 # yarn
 yarn.lock
 yarn-*.log
+
+.envrc
```

수정을 마치고 배포하기 전에 커밋을 하나 추가 하자.

```sh
$ git add .
$ git commit -m "update .gitignore, remove comment in serverless.yml, add js-yaml"
[master 3d84bbe] update .gitignore, remove comment in serverless.yml, add js-yaml
 3 files changed, 12 insertions(+), 104 deletions(-)
 rewrite serverless.yml (96%)
```

첫 배포:
```
$ source .envrc
$ npx sls deploy
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (17.34 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
...............
Serverless: Stack update finished...
Service Information
service: sls-hello-world
stage: dev
region: us-east-1
stack: sls-hello-world-dev
api keys:
  None
endpoints:
  None
functions:
  hello: sls-hello-world-dev-hello
```

`deploy` 명령어는 내부적으로 다음과 같이 동작한다.

1. `serverless.yml` 설정 파일로 부터 AWS CloudFormation 템플릿 파일을 생성한다.
2. 아직 CloudFormation Stack 이 생성되지 않았을 경우 코드의 압축파일이 저장될 s3
   bucket 과 함께 Stack 을 생한다.
3. Lambda function 으로 실행될 코드들을 zip 파일로 압축한다.
4. 이전 배포된 모든 파일에 대한 hash 를 가져온 뒤 현재 로컬에 있는 파일들의 hash
   와 비교한다.
5. 만약에 hash 결과가 같으면 배포 프로세스는 종료된다.
6. hash 결과가 같지 않으면, zip 파일을 s3 bucket 에 업로드한다.
7. 모든 IAM Roles, Lambda Functions, Events 그 외 자원들이 AWS CloudFormation
   템플릿에 추가된다.
8. 새로운 CloudFormation 템플릿으로 Stack 을 업데이트 한다.
9. 각각의 배포는 각 Lambda function 을 새로운 버전으로 발행한다.

`provider.region` 값이 없었으므로 디폴트 리전인 `us-east-1` 에
`sls-hello-world-dev-hello` 이름의 Lambda function 이 배포되었다. [AWS Web
Console][webconsole_lambda] 로 접속하여 확인해도 좋다.

![first-deploy](./check-first-deploy.png)

잘 배포되었는지 `invoke` 명령을 사용해 Lambda function 을 트리거 해볼 수 있다:
```
$ npx sls invoke --function hello
{
    "statusCode": 200,
    "body": "{\"message\":\"Go Serverless v1.0! Your function executed successfully!\",\"input\":{}}"
}
```

`handler.js` 파일의 `hello` 함수가 리턴해주는 내용이 잘 출력됨을 볼 수 있다.

# Lambda Execution Model
람다 실행 모델에 대해 간단히 알아보자. `invoke` 명령어를 통해 배포한 Lambda
function 을 트리거하게 되면 사용자가 정의한 설정에 따라 코드를 실행 할 수 있는
임시 실행환경인 **실행 컨텍스트** 가 시작된다. **실행 컨텍스트** 의
**부트스트래핑** 엔 시간이 다소 소요되며 따라서 첫 호출이나 업데이트 이후, 혹은
오랜만에 Lambda function 을 호출 할때 지연이 발생 할 수 있다. 

Lambda function 이 실행되면 실행 컨텍스트는 연속되는 호출을 예상하여 **일정
시간** 동안 유지 된다. 바로 소멸되지 않고 **freeze** 되는 것인데 이 때 연속되는
호출이 들어오면 **freeze** 시켜 놓았던 **실행 컨텍스트**가 재사용된다.

**실행 컨텍스트**가 재사용되는 케이스에서는 어느정도의 local storage 를 사용한
캐싱이나 기존의 db connection 을 재사용하는 방법 등을 사용하여 최적화를 할 수도
있다. 코딩 전 [Lambda 실행 모델][lambda_execution_model] 을 참고하자!

> 물론 재사용 되지 않는 경우도 고려하여 코딩해야한다.

## `dynamicHello` handler 추가
**실행 컨텍스트**가 재사용 되는 것을 확인해보기 위해 아래와 같이
`dynamicHelloHandler.js` 파일을 작성해보자.

```js
// dynamicHelloHandler.js
let count = 1
module.exports.hello = (event, context, callback) => {

  console.log(event)
  console.log(context)

  const response = {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8;",
    },
    body: `
      <h1>hello ${count++}th 방문자님!!</h1>
      <h3>context.logGroupName ${context.logGroupName}</h3>
      <h3>context.logStreamName: ${context.logStreamName}</h3>
      <h3>context.awsRequestId: ${context.awsRequestId}</h3>
    `,
  }
  callback(null, response)
}
```

템플릿이 업데이트 되지 않았다면, 기본 작성되어 있던 hello 함수는 async function
으로 되어있을 것이다. [async function][async] 은 javascript 함수안에서 비동기
동작을 await 를 사용하여 처리 하겠다는 것 인데 Lambda function 에서는 nodejs
8.10 버전 이상에서 사용 할 수 있다. 포스트에서는 `dynamicHelloHandler.js` 의
`hello` 함수 처럼 `callback` 을 사용하는 기존 스타일로 설명하겠다.

handler 함수가 호출될 때 AWS Lambda 는 `callback` 이라는 함수를 3번째 인자로
제공해준다. callback 을 호출한다는 것은 Lambda function 이 종료되었다는 것을
의미하고 callback 함수 호출시 1번째, 2번째 인자를 통해 응답을 줄 수 있다.
1번째 인자는 error 발생시 `Error` 객체를 응답하는 용도이고, 에러가 없다면 1번째
인자로는 `null`, 2번째 인자로 정상 응답 값을 넘겨주면 된다.  javascript 에서는
비동기 프로세스 처리를 위해 이런 callback 패턴이 흔히 사용된다.

`serverless.yml` 에는 아래와 같이 `dynamicHello` function 을 추가하고 `handler`
를 연결시켜주자.

```diff
 functions:
   hello:
     handler: handler.hello
+  dynamicHello:
+    handler: dynamicHelloHandler.hello
```

여기까지 커밋하자:
```
$ git add dynamicHelloHandler.js
$ git add serverless.yml
$ git commit -m "add dynamicHello"
```

## package 설정
새로운 `dynamicHello` 함수를 배포하기 전, 첫번째 `deploy` 때 로그를 살펴보자.
17MB 정도의 파일을 올리는 것을 볼 수 있는데 serverless 는 기본적으로 현재
디렉토리의 모든 파일을 압축해 s3 로 업로드 시키기 때문이다. `node_modules/`
디렉토리도 포함 되고, Lambda function 실행환경에서 불필요한 파일도 함께
올라가며, 올라가서는 안되는 `.envrc` 와 같은 시크릿 정보도 함께 올라간다.
어디에 올라가는 것일까? `info` 명령어로 확인해보자:
```sh
$ npx sls info --verbose
Service Information
service: sls-hello-world
stage: dev
region: us-east-1
stack: sls-hello-world-dev
api keys:
  None
endpoints:
  None
functions:
  hello: sls-hello-world-dev-hello
  dynamicHello: sls-hello-world-dev-dynamicHello

Stack Outputs
HelloLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:539425821792:function:sls-hello-world-dev-hello:1
ServerlessDeploymentBucketName: sls-hello-world-dev-serverlessdeploymentbucket-p6b4rmgo2fy
```

`ServerlessDeploymentBucketName` 의 값이 바로 배포를 위해 사용하는 S3 버킷 이름
이다. 따로 설정해주시 않으면 임의로 설정되며, 나중에 배포가 잘 안되어 디버깅 할
때 이 버킷을 방문하게 될 것이다. 지금 해당 버킷에 접속하여 업로드된 `zip` 파일을
내려받아 확인해도 좋다.

일단 `serverlesss.yml` 에 `package` 설정을 추가하여 불필요한 파일들이 package
되어 업로드 되는 문제를 해결하자.

```diff
$ git diff serverlesss.yml
diff --git a/serverless.yml b/serverless.yml
index 3a97e31..35bbb84 100644
--- a/serverless.yml
+++ b/serverless.yml
@@ -1,5 +1,12 @@
 service: sls-hello-world

+package:
+  exclude:
+    - ./**
+  include:
+    - handler.js
+    - dynamicHelloHandler.js
+
 provider:
   name: aws
   runtime: nodejs8.10
```

모든 파일을 제외한 뒤 핸들러 파일들만 업로드 하는 설정이다. 다시 한번
배포해보자. 이번엔 `--verbose` 옵션을 추가하여 AWS 어떤 자원이 변경되는 것인지
확인 하면서 배포해보자:

```sh
$ npx sls deploy --verbose
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (827 B)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - sls-hello-world-dev
CloudFormation - UPDATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - DynamicHelloLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - DynamicHelloLogGroup
CloudFormation - CREATE_COMPLETE - AWS::Logs::LogGroup - DynamicHelloLogGroup
CloudFormation - UPDATE_COMPLETE - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - DynamicHelloLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - DynamicHelloLambdaFunction
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Function - DynamicHelloLambdaFunction
CloudFormation - UPDATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - UPDATE_COMPLETE - AWS::Lambda::Function - HelloLambdaFunction
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - DynamicHelloLambdaVersionnOuATVmieltlZdOnqR3DSXvkVXUK1IWvYRYKODrew
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - HelloLambdaVersionKc0KtAISSGf81l8cTLEUyEI1EvplbR2SlEqYqfPFJ1o
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - DynamicHelloLambdaVersionnOuATVmieltlZdOnqR3DSXvkVXUK1IWvYRYKODrew
CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - HelloLambdaVersionKc0KtAISSGf81l8cTLEUyEI1EvplbR2SlEqYqfPFJ1o
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - DynamicHelloLambdaVersionnOuATVmieltlZdOnqR3DSXvkVXUK1IWvYRYKODrew
CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - HelloLambdaVersionKc0KtAISSGf81l8cTLEUyEI1EvplbR2SlEqYqfPFJ1o
CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - sls-hello-world-dev
CloudFormation - DELETE_SKIPPED - AWS::Lambda::Version - HelloLambdaVersiongWX1sqOZC01JQ3WPZbUZpPFUJe4THxKGqQgG6M8b50o
CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - sls-hello-world-dev
Serverless: Stack update finished...
Service Information
service: sls-hello-world
stage: dev
region: us-east-1
stack: sls-hello-world-dev
api keys:
  None
endpoints:
  None
functions:
  hello: sls-hello-world-dev-hello
  dynamicHello: sls-hello-world-dev-dynamicHello

Stack Outputs
DynamicHelloLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:666252830126:function:sls-hello-world-dev-dynamicHello:1
HelloLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:666252830126:function:sls-hello-world-dev-hello:2
ServerlessDeploymentBucketName: sls-hello-world-dev-serverlessdeploymentbucket-hzgkhdmmg10i
```

이제 딱 827Byte, 필요한 파일만 upload 되는 것을 볼 수 있다. `package` 설정을
통해 업로드 되는 코드의 용량이 줄어들 뿐만 아니라 무심코 API KEY 같은 파일이 s3
로 업로드 되는 실수 등도 방지 할 수 있다. `ServerlessDeploymentBucketName` S3
버킷에 방문하여 새롭게 업로드된 zip 파일을 확인하자.

이상 없음을 확인 하였으면 커밋 후 계속 진행하자.
```sh
$ git add serverless.yml
$ git commit -m "add package setting"
```

# logging
`dynamicHello` 함수에는 디버깅을 위해 `console.log` 를 사용했다. `invoke` 에
`--log` 옵션을 붙이면 응답 값 뿐만 아니라 로그도 확인 할 수 있다.

```sh
$ npx sls invoke --function dynamicHello --log
{
    "statusCode": 200,
    "headers": {
        "Content-Type": "text/html; charset=utf-8;"
    },
    "body": "\n      <h1>hello 1th 방문자님!!</h1>\n      <h3>context.logGroupName: /aws/lambda/sls-hello-world-dev-dynamicHello</h3>\n      <h3>context.awsRequestId: 573048a6-b034-11e8-9404-bbe59aba3f24</h3>\n      <h3>context.logStreamName: 2018/09/04/[$LATEST]0c3c0ba410494f9e926deaf73c7f4129</h3>\n    "
}
--------------------------------------------------------------------
START RequestId: b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1 Version: $LATEST
2018-09-03 22:53:20.634 (+09:00)	b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1	{}
2018-09-03 22:53:20.635 (+09:00)	b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1	{ callbackWaitsForEmptyEventLoop: [Getter/Setter],
  done: [Function: done],
  succeed: [Function: succeed],
  fail: [Function: fail],
  logGroupName: '/aws/lambda/sls-hello-world-dev-dynamicHello',
  logStreamName: '2018/09/03/[$LATEST]406d33b8c803452fbf0097854516b464',
  functionName: 'sls-hello-world-dev-dynamicHello',
  memoryLimitInMB: '1024',
  functionVersion: '$LATEST',
  getRemainingTimeInMillis: [Function: getRemainingTimeInMillis],
  invokeid: 'b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1',
  awsRequestId: 'b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1',
  invokedFunctionArn: 'arn:aws:lambda:us-east-1:539425821792:function:sls-hello-world-dev-dynamicHello' }
END RequestId: b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1
REPORT RequestId: b72a2f8b-af80-11e8-8b7b-d10ef88ce9a1	Duration: 5.34 ms	Billed Duration: 100 ms 	Memory Size: 1024 MB	Max Memory Used: 47 MB
```

`invoke` 명령으로 로그를 보는 법 말고도 **serverless** 가 기본으로 CloudWatch
LogGroup 을 설정해주고 로그를 쌓아주므로 [CloudWatch][webconsole_cloudwatch] 의
`Logs` 메뉴에서 위 디버깅 로그로 남긴 `logGroupName` 값, `logStreamName` 값,
`awsRequestId` 값 순으로 찾아 들어가서 로그를 확인 할 수 있다.

바로 똑같은 `invoke` 명령어를 한번 더 실행해보면 `count` 값이 1 증가되는 것을
볼 수 있는데 이로써 **실행 컨텍스트** 가 재사용 되었다는 것을 확인 할 수 있다.
```
    "body": "\n      <h1>hello 2th 방문자님!!</h1> ...
```

테스트 결과 `logStreamName` 이 변경되면 `count` 값이 0으로 초기화 되는 것을
확인 할 수 있는데 `logStreamName` 은 **실행 컨텍스트** 마다 생성되는 것으로
강력하게 추정된다. **일정시간** 만큼만 **실행 컨텍스트** 를 소멸하지 않고
유지하기 때문에 한 20분 후에 다시 호출해보면 `logStreamName` 이 변경되며
`count` 값이 0으로 초기화 되는 것을 볼 수 있다. **일정시간** 에 대해서는 딱
공개된 정보는 없고 유저가 컨트롤 하지 못하는 영역이다.

# event 설정
지금까지는 serverless 의 invoke 명령을 통해서 즉, 내부적으로 AWS API 를 통해
Lambda Function 을 트리거 시켰었다. 이런 방법 외에 Lambda function 은 여러가지
이벤트에 의해 트리거 될 수 있는데 API Gateway, CloudWatch Event, AWS IoT, S3
Event, SNS, SQS 등 [이밖에 많은 서비스들][serverless_event]의 이벤트를 받을 수 있다.
`serverless.yml` 의 각 `functions.[functionId].events` 프로퍼티를 통해 function
단위로 이벤트 설정을 할 수 있다.

## API Gateway
API Gateway 로 http request 를 받을 수 있는 endpoint 를 생성하고 이를 통해
Lambda function 을 호출해보자. 각각의 `function` 에 `http` 이벤트를 추가하자.

```diff
  functions:
   hello:
     handler: handler.hello
+    events:
+      - http:
+          path: hello
+          method: get
   dynamicHello:
     handler: dynamicHelloHandler.hello
+    events:
+      - http:
+          path: dynamicHello
+          method: get
```

배포해보자. output 으로 ApiGateway 자원이 생성되는 것이 보일 것이다.
```sh
$ npx sls deploy --verbose

...skip...

Serverless: Stack update finished...
Service Information
service: sls-hello-world
stage: dev
region: ap-southeast-1
stack: sls-hello-world-dev
api keys:
  None
endpoints:
  GET - https://j4ee7ascxe.execute-api.ap-southeast-1.amazonaws.com/dev/hello
  GET - https://j4ee7ascxe.execute-api.ap-southeast-1.amazonaws.com/dev/dynamicHello
functions:
  hello: sls-hello-world-dev-hello
  dynamicHello: sls-hello-world-dev-dynamicHello

Stack Outputs
DynamicHelloLambdaFunctionQualifiedArn: arn:aws:lambda:ap-southeast-1:666252830126:function:sls-hello-world-dev-dynamicHello:1
HelloLambdaFunctionQualifiedArn: arn:aws:lambda:ap-southeast-1:666252830126:function:sls-hello-world-dev-hello:1
ServiceEndpoint: https://j4ee7ascxe.execute-api.ap-southeast-1.amazonaws.com/dev
ServerlessDeploymentBucketName: sls-hello-world-dev-serverlessdeploymentbucket-us6okqk60pg3
```

`endpoints` 에 https 로 시작하는 url 을 확인 할 수 있는데 브라우저나 `curl` 을
통해 접속해보자.

```sh
$ curl https://j4ee7ascxe.execute-api.ap-southeast-1.amazonaws.com/dev/hello
{"message":"Go Serverless v1.0! Your function executed successfully!","input":{"resource":"/hello","path":"/hello","httpMethod":"GET","headers":{"Accept":"*/*","CloudFront-Forwarded-Proto":"https","CloudFront-Is-Desktop-Viewer":"true","CloudFront-Is-Mobile-Viewer":"false","CloudFront-Is-SmartTV-Viewer":"false","CloudFront-Is-Tablet-Viewer":"false","CloudFront-Viewer-Country":"KR","Host":"j4ee7ascxe.execute-api.ap-southeast-1.amazonaws.com","User-Agent":"curl/7.54.0","Via":"2.0 da3be2ba5cd319952c9db52c6f3c715c.cloudfront.net (CloudFront)","X-Amz-Cf-Id":"EXYx-PohLXNwa4eGx1GOEBV5kP7qZsbginFMQZOjGVvyxPVFdYP0dg==","X-Amzn-Trace-Id":"Root=1-5b8eaee8-07672508c938123458d48bb8","X-Forwarded-For":"175.223.11.52, 54.182.204.73","X-Forwarded-Port":"443","X-Forwarded-Proto":"https"},"queryStringParameters":null,"pathParameters":null,"stageVariables":null,"requestContext":{"resourceId":"b6n6vi","resourcePath":"/hello","httpMethod":"GET","extendedRequestId":"MtBEXFi2SQ0FnSg=","requestTime":"04/Sep/2018:16:12:24 +0000","path":"/dev/hello","accountId":"666252830126","protocol":"HTTP/1.1","stage":"dev","requestTimeEpoch":1536077544798,"requestId":"4f8e6888-b05d-11e8-a741-250502e1c1f9","identity":{"cognitoIdentityPoolId":null,"accountId":null,"cognitoIdentityId":null,"caller":null,"sourceIp":"175.223.11.52","accessKey":null,"cognitoAuthenticationType":null,"cognitoAuthenticationProvider":null,"userArn":null,"userAgent":"curl/7.54.0","user":null},"apiId":"j4ee7ascxe"},"body":null,"isBase64Encoded":false}}
```

`invoke` 로 호출하였을때 빈 object 였던 `event` 객체에 정보가 담겨 있다.

```
$ curl https://j4ee7ascxe.execute-api.ap-southeast-1.amazonaws.com/dev/dynamicHello

      <h1>hello 1th 방문자님!!</h1>
      <h3>context.logGroupName: /aws/lambda/sls-hello-world-dev-dynamicHello</h3>
      <h3>context.awsRequestId: 6e77c4cb-b05d-11e8-92df-9f64c0543e9c</h3>
      <h3>context.logStreamName: 2018/09/04/[$LATEST]fdbf1b3ea9c443348236d035e4e10f42</h3>
```

잘 동작하는 것을 확인하였으면 커밋하자:
```sh
$ git add serverless.yml
$ git commit -m "add http event"
```

# remove
다음 예제에서 default region 인 `us-east-1` 에 배포된 Lambda function 을
다른 리전으로 변경 할 것이다. `remove` 명령을 사용해 현재 배포된 자원들을
삭제한 뒤 리전 셋팅을 하고 다시 배포할 것이다.

```
$ npx sls remove --verbose
```

ServerlessDeploymentBucket, CloudWatch LogGroup 모두 삭제 되니 운영환경에서는
주의해서 사용해야한다.

# S3 Access
흔히 볼 수 있는 serverless 예제 중 하나는 S3 에 접근하여 Object 를 읽어오거나
저장하는 예제이다. S3 의 텍스트 파일을 upload 한뒤 Lambda fuction 에서 이
Object 를 읽어와 응답으로 내려주는 핸들러를 작성해보자.

## Execution role
Lambda function 에서 AWS 자원에 접근하기 위해서는 해당 자원에 대한 권한이 있어야 한다.
Execution role 설정으로 Lambda function 이 실행될 때 사용하는 IAM Role 을 선택하는데,
확인해보면 deploy 할 때 serverless 가 IAM Role 을 하나 생성한 것을 발견 할 수 있다.
기본적으로 로그 그룹에 로그를 올릴 수 있도록 `logs:PutlogEvents` 권한만 가지고 있는데,
`provider.iamRoleStatements` 설정을 추가하여 S3 특정 버킷 접근 권한을 추가 할 수 있다.

```diff
 provider:
   name: aws
   runtime: nodejs8.10
+  region: ap-southeast-1
+  iamRoleStatements:
+    - Effect: Allow
+      Action:
+        - s3:GetObject
+        - s3:PutObject
+        - s3:ListBucket
+      Resource:
+        - "arn:aws:s3:::${env:SLS_BUCKET_NAME}"
+        - "arn:aws:s3:::${env:SLS_BUCKET_NAME}/*"
```

## serverless.yml 설정에서 환경변수 사용하기
`${env:SLS_BUCKET_NAME}` 부분을 주목하자. s3 버킷 이름 등을 하드코딩하면 다른
환경에서 사용하거나 오픈소스로 오픈할 때 사용하는 사람은 코드를 수정해야만 할
것이다. 환경마다 달라질 수 있는 부분은 환경변수로 따로 빼는 것이 좋다.

`${env:SOME_VAR}` 이런 문법을 사용하여 현재 쉘의 환경변수를 `serverless.yml`
안에서 참고 할 수 있다. 또 환경변수를 배운 지금이 리전을 설정할 타이밍이다.
`provider.iamRoleStatements` 설정 외에 `provider.region` 설정도 추가했다.
`SLS_BUCKET_NAME` 과 함께 `AWS_DEFAULT_REGION` 환경 변수도 추가해주자. `.envrc`
파일을 통해 환경변수를 관리한다면 다음과 같이 설정되었을 것이다.

```sh
# .envrc
export AWS_ACCESS_KEY_ID=AKXXXXXXXXXXXXXXXXGQ
export AWS_SECRET_ACCESS_KEY=+IxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxK5
export AWS_DEFAULT_REGION=ap-southeast-1

export SLS_BUCKET_NAME=sls-hello-world-293874131
```

## s3 bucket access
nodejs 라이브러리인 [aws-sdk][aws_sdk_js] 를 사용하여 s3 버킷을 생성하고
`package.json` 파일을 업로드 해두자.

```sh
$ source .envrc
$ aws s3api create-bucket --bucket $SLS_BUCKET_NAME --region $AWS_DEFAULT_REGION
$ # aws s3api create-bucket --bucket $SLS_BUCKET_NAME --region $AWS_DEFAULT_REGION --create-bucket-configuration LocationConstraint=$AWS_DEFAULT_REGION
{
    "Location": "http://sls-hello-world-293874131.s3.amazonaws.com/"
}
$ aws s3 cp package.json s3://$SLS_BUCKET_NAME/
```

## Labmda Function 에 환경변수 사용하기
이번엔 `dynamicHelloHandler.js` 파일에 getS3Object 함수를 추가해보자.

```diff
$ git diff dynamicHelloHandler.js
diff --git a/dynamicHelloHandler.js b/dynamicHelloHandler.js
index bae491e..182c40f 100644
--- a/dynamicHelloHandler.js
+++ b/dynamicHelloHandler.js
@@ -1,4 +1,7 @@
 // dynamicHelloHandler.js
+
+const AWS = require('aws-sdk')
+
 let count = 1
 module.exports.hello = (event, context, callback) => {

@@ -19,3 +22,23 @@ module.exports.hello = (event, context, callback) => {
   }
   callback(null, response)
 }
+
+
+const Bucket = process.env.SLS_BUCKET_NAME
+module.exports.getS3Object = (event, context, callback) => {
+
+  console.log(event)
+  console.log(context)
+
+  const Key = event.pathParameters.key
+
+  const s3 = new AWS.S3()
+  const params = { Bucket, Key }
+  s3.getObject(params, (err,data) => {
+    if( err ) {
+      callback(err)
+      return
+    }
+    callback(null, { statusCode: 200, body: data.Body.toString('utf-8') })
+  })
+}
```

코드에서 `process.env` 를 통해 환경변수에 접근하고 있다. `source .envrc`
명령으로 `deploy` 전 로컬 쉘에 환경변수 셋팅을 해놓았을지라도 그 환경변수는
`serverless.yml` 에 `${env:SOME_VAR}` 문법으로 사용할 수 있게 제공되는 것이지
Lambda function 실행환경에서 `process.env` 로 접근 할 수는 없다.
`serverless.yml` 에 `environment` 설정을 추가해 줘야 Lambda Function 실행환경의
환경변수가 셋팅된다.

```diff
 diff --git a/serverless.yml b/serverless.yml
index 1bfe983..747017c 100644
--- a/serverless.yml
+++ b/serverless.yml
@@ -18,6 +18,8 @@ provider:
         - s3:PutObject
         - s3:ListBucket
       Resource: "arn:aws:s3:::${env:SLS_BUCKET_NAME}/*"
+  environment:
+    SLS_BUCKET_NAME: ${env:SLS_BUCKET_NAME}

 functions:
   hello:
@@ -32,3 +34,9 @@ functions:
       - http:
           path: dynamicHello
           method: get
+  getS3Object:
+    handler: dynamicHelloHandler.getS3Object
+    events:
+      - http:
+          path: getS3Object/{key}
+          method: get
```

위처럼 `provider` 설정 아래에 `environment` 설정을 두고 `KEY: Value` 로 설정
하면 모든 Lambda functions 에서 접근 가능해지며 특정 function 아래
`environment` 를 두면 해당 function 에서만 접근 가능한 환경 변수가 셋팅된다.

`getS3Object` function 도 추가하였는데 http 이벤트의 path 값으로
`getS3Object/{key}` 를 사용한다. `/getS3Object/package.json` 이런 path 로
접속하면 `{key}` 위치에 해당하는 값을 첫번째 인자인 `event` 객체 아래
`pathParameters` 객체에서 찾을 수 있다.

```sh
$ curl https://j4ee7ascxe.execute-api.ap-southeast-1.amazonaws.com/dev/getS3Object/package.json
{
  "name": "sls-hello-world",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "serverless": "^1.30.3"
  },
  "devDependencies": {
    "js-yaml": "^3.12.0"
  }
}
```

S3 로 upload 시켰던 `package.json` 파일의 내용이 잘 내려오는 것을 확인 할 수 있다.
커밋하고 넘어가자.

```sh
$ git add serverless.yml
$ git add dynamicHelloHandler.js
$ git commit -m "add getS3Object for s3 access example"
```

# 모듈화 & 서드파티 모듈 사용하기
npm 을 통해 설치한 서드파티 모듈을 사용하는 Lambda Function 을 작성해보자. 흔한
예제인 이미지 리사이징을 해볼텐데, s3 의 이미지를 가져오고, 리사이징하고, 다시
업로드 시키는 함수는 다음과 같다.

```js
// lib/imgUtil.js

import AWS from 'aws-sdk'
import path from 'path'
import fs from 'fs'

import _gm from 'gm'

const gm = _gm.subClass({ imageMagick: true })
const s3 = new AWS.S3()

export const downloadImage = (bucketName, key) => new Promise((resolve, reject) => {
  const destPath = path.join('/tmp', (new Date()).getTime().toString())
  s3.getObject({ Bucket: bucketName, Key: key }).promise().then( data => {
    fs.writeFile(destPath, data.Body, err => err ? reject(err) : resolve(destPath))
  }).catch( reject )
})

export const getImageInfo = imagePath => new Promise((resolve, reject) => {
  gm(imagePath).identify((err, info) => err ? reject(err) : resolve(info))
})

export const resizeImage = (info, size) => new Promise((resolve, reject) => {
  const resizeOpts = /^(\d+)x(\d+)([%@!<>])?$/g.exec( size )
  gm(info.path).resize(resizeOpts[1], resizeOpts[2], resizeOpts[3])
 .toBuffer(info.format, (err, buffer) => err ? reject(err) : resolve(buffer))
})
```

모든 코드를 다 이해할 필요는 없고 함수 이름으로 유추만 해보면 된다. 이
코드에서는 `require` 대신에 `import` 를, `module.exports.functionName` 대신
`export const functionName` 을 사용했다는 점이 중요하다. javascript ES6 스펙을
사용한 것인데 nodejs 8.10 버전에서도 모든 ES6 스펙을 지원하는 것은 아니기
때문에 실행 되는 코드로 변환시켜주는 transform 작업이 필요하다. 우선 이 코드로
배포 후 돌아가지 않는 것을 확인 한 뒤 해결해 볼 것이다.

새 핸들러 파일 `resizeHandler.js` 을 만들고 위 코드를 불러와 사용해보자.

```js
// resizeHandler.js

const path = require('path')
const AWS = require('aws-sdk')

const imgUtil = require('./lib/imgUtil')

const Bucket = process.env.SLS_BUCKET_NAME
const s3 = new AWS.S3()

module.exports.resize = (event, context, callback) => {
  const originalKey = event.Records[0].s3.object.key
  console.log('originalKey: ' + originalKey)

  let imgInfo
  imgUtil.downloadImage( Bucket, originalKey ).then( imgPath => {
    console.log( `imgPath: ${imgPath}` )
    return imgUtil.getImageInfo( imgPath )

  }).then( _imgInfo => {
    imgInfo = _imgInfo
    console.log( 'imgInfo: ' )
    console.log( JSON.stringify(imgInfo,null,2) )
    return imgUtil.resizeImage(imgInfo, '160x120')

  }).then( buffer => {
    const Key = path.join('resize', path.basename(originalKey))
    console.log('(resized)Key: ' + Key)
    const Body = buffer
    const ContentType = imgInfo['Mime type']
    return s3.upload({ Bucket, Key, Body, ContentType }).promise()

  }).then( data => {
    callback(null, { statusCode: 200, body: JSON.stringify(data,null,2) })

  }).catch( err => {
    callback(err)
  })
}
```

S3 에 이미지가 업로드되면 `resize` 함수가 호출되어 이미지를 먼저 다운 받고
`160*120` 로 리사이즈 한 뒤 리사이즈된 이미지를 S3 버킷 `resize/` prefix 에
업로드 하는 예제이다.

## S3 ObjectCreated event
이미지 파일을 s3 에 업로드하면 발생하는 ObjectCreated 이벤트로 위의 resize
함수를 호출하기 위해 `serverless.yml` 에 새 함수와 이벤트 설정을 추가하자.

```diff
$ git diff serverless.yml
diff --git a/serverless.yml b/serverless.yml
index 747017c..f6fa169 100644
--- a/serverless.yml
+++ b/serverless.yml
@@ -6,6 +6,8 @@ package:
   include:
     - handler.js
     - dynamicHelloHandler.js
+    - resizeHandler.js
+    - lib/imgUtil.js

 provider:
   name: aws
@@ -40,3 +42,11 @@ functions:
       - http:
           path: getS3Object/{key}
           method: get
+  resize:
+    handler: resizeHandler.resize
+    events:
+      - s3:
+          bucket: ${env:SLS_BUCKET_NAME}
+          event: s3:ObjectCreated:*
+          rules:
+            - prefix: images/
```

배포해보자.
```
$ npx sls deploy --verbose

...skip...

Serverless: Operation failed!

  Serverless Error ---------------------------------------

  An error occurred: S3BucketSlshelloworld293874131 - sls-hello-world-293874131 already exists.

  Get Support --------------------------------------------
     Docs:          docs.serverless.com
     Bugs:          github.com/serverless/serverless/issues
     Issues:        forum.serverless.com

  Your Environment Information -----------------------------
     OS:                     darwin
     Node Version:           8.9.4
     Serverless Version:     1.30.3
```

`sls-hello-world-293874131 already exists` 에러가 나면서 deploy 가 실패 한다.

### serverless-plugin-exist-s3
이 문제는 `events` 프로퍼티에 S3 event 가 추가되면 serverless 의 기본 동작은
일단 새로운 버킷을 생성하는 것이다. 그러나 의식의 흐름대로 예제를 진행하다보니
s3 bucket 을 먼저 생성하여 사용하고 있었고, `already exists` 에러가 나는
것이다.  걱정하지말자. **serverless** 는 plugin 을 통해 기본 툴이 지원해 주지
않는 확장 기능들을 구현 하여 문제를 해결 할 수 있다.
`serverless-plugin-existing-s3` 플러그인은 이런 `already exists` 문제를
해결하기위해 개발된 플러그인이다. [플러그인의 README][existings3] 가이드를 따라
`serverless.yml` 설정을 변경 하자.

```diff
$ git diff serverless.yml
diff --git a/serverless.yml b/serverless.yml
index aea67f8..59fcf5d 100644
--- a/serverless.yml
+++ b/serverless.yml
@@ -1,11 +1,16 @@
 service: sls-hello-world

+plugins:
+  - serverless-plugin-existing-s3
+
 package:
   exclude:
     - ./**
   include:
     - handler.js
     - dynamicHelloHandler.js
+    - resizeHandler.js
+    - lib/imgUtil.js

 provider:
   name: aws
@@ -18,6 +23,13 @@ provider:
         - s3:PutObject
         - s3:ListBucket
       Resource: "arn:aws:s3:::${env:SLS_BUCKET_NAME}/*"
+    - Effect: Allow
+      Action:
+        - s3:PutBucketNotification
+      Resource:
+        Fn::Join:
+          - ""
+          - - "arn:aws:s3:::${env:SLS_BUCKET_NAME}"
   environment:
     SLS_BUCKET_NAME: ${env:SLS_BUCKET_NAME}

@@ -40,3 +52,13 @@ functions:
       - http:
           path: getS3Object/{key}
           method: get
+  resize:
+    handler: resizeHandler.resize
+    events:
+      - existingS3:
+          bucket: ${env:SLS_BUCKET_NAME}
+          events:
+            - s3:ObjectCreated:*
+          rules:
+            - suffix: .png,jpg,jpeg
```

플러그인을 설치하고 배포해보자:
```sh
$ yarn add serverless-plugin-existing-s3
$ npx sls deploy --verbose
$ npx sls s3deploy
```

`deploy` 시 에러가 나지 않을 것이며, 추가로 `s3deploy` 를 수행할 때,
`serverless-plugin-existing-s3` 플러그에서 S3 Bucket 에 `Notification` 설정을
해준다.

이미지 파일을 업로드하여 함수가 잘 호출되는지 테스트 해보자:
```
$ aws cp example1.png s3://$SLS_BUCKET_NAME/
```

CloudWatch 를 통해 `resize` 함수의 호출 로그를 확인해보면 위에서 언급 한 것과 같이
ES6 스펙을 해석하지 못하여 아래와 같은 에러가 날 것이다.

```sh
Syntax error in module 'resizeHandler': SyntaxError
import AWS from 'aws-sdk'
^^^^^^

SyntaxError: Unexpected token import
at createScript (vm.js:80:10)
at Object.runInThisContext (vm.js:139:10)
at Module._compile (module.js:616:28)
at Object.Module._extensions..js (module.js:663:10)
at Module.load (module.js:565:32)
at tryModuleLoad (module.js:505:12)
at Function.Module._load (module.js:497:3)
at Module.require (module.js:596:17)
at require (internal/module.js:11:18)
at Object.<anonymous> (/var/task/resizeHandler.js:2:17)
```

완벽하지 않기에 이번엔 브랜치를 따서 커밋을 하고 이 문제를 해결 한 뒤 `master`
브랜치로 머지해보자.

```sh
$ git add .
$ git stash
$ git checkout -b dev/s3-object-created-event
$ git stash pop
$ git add .
$ git commit -m "add serverless-plugin-existing-s3, add image resize function"
```

## serverless-webpack
`serverless-webpack` 플러그인이 필요한 이유는 다음과 같다.

1. ES6 스펙을 사용하고 싶을 때
2. 파일이 추가 될 때 마다 `package.include` 에 추가하는 것이 귀찮을 때
3. npm 에서 내려받아 node_modules 아래 설치된 서드파티 모듈을 추가 해야 할 때

[webpack][webpack]은 ES6 와 같은 javascript 코드를 브라우저에서 실행 가능한
파일로 transform 을 해주는 툴인데, 여기에는 번들링 작업이 포함된다. entry point
파일로부터 이 파일이 로드하는 다른 파일들을 줄줄이 로드하여 단일 js 파일로
만들어주는 것이다. browser 에서 실행되는 코드에 주로 사용하지만 `nodejs`
환경에서도 사용 할 수 있으며, **serverless** 와 함께 실행시에는
`serverless-webpack` 플러그인을 사용하면 `deploy` 시 자동으로 **webpack** 이
실행되고 output js 번들 파일만이 업로드 된다.

```sh
$ yarn add webpack serverless-webpack
$ yarn add @babel/core babel-loader
```

webpack 은 다음과 같은 `webpack.config.js` 설정 파일을 사용한다.

```js
// webpack.config.js

const path = require('path')
const slsw = require('serverless-webpack')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  target: 'node',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  externals: ['aws-sdk'],
}
```

`aws-sdk` 는 Lambda 실행환경에서 제공되므로 번들링시 제외하기위해 `externals`
에 추가하였다.  `serverless.yml` 에는 `serverless-webpack` 플러그인을 위한
설정이 추가되어야 한다. `serverless-webpack` 을 사용하면 `package` 설정이
무시되기 때문에 삭제해도 되며 Lambda function 의 timeout 을 기본 6초에서 15초로
늘려 큰 이미지 변환시 timeout 으로 종료되지 않도록 처리하였다.
```diff
$ git diff serverless.yml
diff --git a/serverless.yml b/serverless.yml
index 8ab3bc7..84c94b5 100644
--- a/serverless.yml
+++ b/serverless.yml
@@ -2,20 +2,17 @@ service: sls-hello-world

 plugins:
   - serverless-plugin-existing-s3
+  - serverless-webpack

-package:
-  exclude:
-    - ./**
-  include:
-    - handler.js
-    - dynamicHelloHandler.js
-    - resizeHandler.js
-    - lib/imgUtil.js
+custom:
+  webpack:
+    packager: yarn

 provider:
   name: aws
   runtime: nodejs8.10
   region: ${env:AWS_DEFAULT_REGION}
+  timeout: 15
   iamRoleStatements:
     - Effect: Allow
       Action:
```

배포해보자:
```sh
$ npx sls deploy --verbose
Serverless: Using configuration:
{
  "packager": "yarn",
  "webpackConfig": "webpack.config.js",
  "includeModules": false,
  "packagerOptions": {}
}
Serverless: Removing /Users/ssohjiro/project-poc/sls-hello-world/.webpack
Serverless: Bundling with Webpack...
Time: 694ms
Built at: 2018-09-05 15:20:45
                 Asset      Size  Chunks             Chunk Names
            handler.js  1.12 KiB       0  [emitted]  handler
dynamicHelloHandler.js  1.62 KiB       1  [emitted]  dynamicHelloHandler
      resizeHandler.js  57.3 KiB       2  [emitted]  resizeHandler
Entrypoint handler = handler.js
Entrypoint dynamicHelloHandler = dynamicHelloHandler.js
Entrypoint resizeHandler = resizeHandler.js
 [0] external "fs" 42 bytes {2} [built]
 [1] external "path" 42 bytes {2} [built]
 [2] ./node_modules/gm/lib/utils.js 776 bytes {2} [built]
 [3] external "aws-sdk" 42 bytes {1} {2} [built]
 [4] external "util" 42 bytes {2} [built]
[12] ./node_modules/gm/lib/compare.js 3.76 KiB {2} [built]
[13] ./node_modules/gm/index.js 2.95 KiB {2} [built]
[14] ./handler.js 408 bytes {0} [built]
[15] ./dynamicHelloHandler.js 1.01 KiB {1} [built]
[16] ./resizeHandler.js 1.23 KiB {2} [built]
[17] ./lib/imgUtil.js 981 bytes {2} [built]
[22] ./node_modules/gm/lib/drawing.js 4.16 KiB {2} [built]
[23] ./node_modules/gm/lib/convenience.js 233 bytes {2} [built]
[29] ./node_modules/gm/lib/command.js 10.7 KiB {2} [built]
[54] ./node_modules/gm/package.json 943 bytes {2} [built]
    + 40 hidden modules

WARNING in ./node_modules/spawn-sync/lib/spawn-sync.js
Module not found: Error: Can't resolve 'try-thread-sleep' in '/Users/ssohjiro/project-poc/sls-hello-world/node_modules/spawn-sync/lib'
 @ ./node_modules/spawn-sync/lib/spawn-sync.js
 @ ./node_modules/spawn-sync/index.js
 @ ./node_modules/cross-spawn/index.js
 @ ./node_modules/gm/lib/compare.js
 @ ./node_modules/gm/index.js
 @ ./lib/imgUtil.js
 @ ./resizeHandler.js
Serverless: Zip service: /Users/ssohjiro/project-poc/sls-hello-world/.webpack/service [18 ms]
Serverless: Packaging service...
Serverless: Remove /Users/ssohjiro/project-poc/sls-hello-world/.webpack
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (23.38 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
```

test 해보자:
```sh
$ s3 cp some-image.jpg s3://$SLS_BUCKET_NAME/images/
$ s3 cp s3://$SLS_BUCKET_NAME/resize/some-image.jpg .
$ open some-image.jpg
```

에러 없이 배포와 실행이 잘 되었다면 커밋 한뒤 master 에 merge 하자.
```sh
$ git add .
$ git commit -m "apply serverless-webpack"
$ git checkout master
$ git merge --no-ff dev/s3-object-created-event
$ git branch -d dev/s3-object-created-event
$ git log --oneline --graph
*   e2ef42d (HEAD -> master) Merge branch 'dev/s3-object-created-event'
|\
| * 1d86de6 apply serverless-webpack
| * d85d735 add serverless-plugin-existing-s3, image resize function
|/
* e907897 add getS3Object for s3 access example
* e81e669 will squash. remove rest commment
* 88a4b3e add http event
* 9d97ea3 add package setting
* 1958b75 add dynamicHello
* 4a5eb17 update .gitignore, remove comment in serverless.yml, add js-yaml
* 4050575 initial commit
```

# SNS
호출된 모든 Lambda function 은 두 번 재시도한 뒤에 해당 이벤트를 무시하게
되는데 이때 [DLQ(Dead Letter Queue)][dlq]를 사용하여 처리되지 않은 이벤트를
Amazon SQS 또는 Amazon SNS 로 보내 결함을 분석해 볼 수 있다. **serverless**
에서도 각 함수 아래 `onError` 설정을 추가하여 사용 할 수 있다.

sns-topic 을 생성하고 `serverless.yml` 에 `onError` 를 추가해보자.
```
$ aws sns create-topic --region $AWS_DEFAULT_REGION --name test223
{
    "TopicArn": "arn:aws:sns:ap-southeast-1:666252830126:test223"
}
```

SNS ARN 역시 환경변수로 따로 관리하는 것이 바람직하다.
```
# .envrc

export SLS_SNS_TOPIC_ARN=arn:aws:sns:ap-southeast-1:666252830126:test223
```

테스트 할 구독자를 추가하자:
```
$ source .envrc
$ aws sns subscribe --topic-arn $SLS_SNS_TOPIC_ARN --protocol sms --notification-endpoint '+821012341234'
$ aws sns subscribe --topic-arn $SLS_SNS_TOPIC_ARN --protocol email --notification-endpoint me@aluc.io
$ ...
```

`serverless.yml` 에 onError 를 추가하자
```diff
   resize:
     handler: resizeHandler.resize
+    onError: ${env:SLS_SNS_TOPIC_ARN}
     events:
       - existingS3:
           bucket: ${env:SLS_BUCKET_NAME}
```

SNS 메시지로 기본적으로 event 객체의 내용이 전달된다. 이 메시지로부터 로그를
찾아 갈 수 있도록 종료전 event 객체를 출력하는 코드를 추가하자.
```diff
$ git diff resizeHandler.js
diff --git a/resizeHandler.js b/resizeHandler.js
index 20059b6..68c02f5 100644
--- a/resizeHandler.js
+++ b/resizeHandler.js
@@ -38,6 +38,7 @@ module.exports.resize = (event, context, callback) => {
     callback(null, { statusCode: 200, body: JSON.stringify(data,null,2) })

   }).catch( err => {
-    callback(err)
+    console.log(event)
+    console.log(err)
   })
 }
```

배포한 후 `images/` 경로에 텍스트 파일을 올려 이미지 변환시 에러가 발생하도록
하고 SNS 노티가 잘 전송되는지 확인하자:
```sh
$ source .envrc
$ npx sls deploy --verbose
$ aws s3 cp webpack.config.js s3://$SLS_BUCKET_NAME/images/
```

Lambda function 의 내부 동작에 의해 에러 발생 시 2번 재시도 된 후 노티가 온다.
노티가 잘 온다면 커밋하고 넘어가자:

```sh
$ git add serverless.yml resizeHandler.js
$ git commit -m "apply SNS Notification by onError"
```

# S3 Rekognition
**serverless** 가 좋은 점은 [수 많은 example][examples] 들이 있기 때문이다. AI
로 이미지를 분석해주는 AWS 서비스인 AWS Rekognition 을 [예제][rek_example]를
참고하여 구현해보자.

먼저 github 저장소에 있는 lib/imageAnalyser.js `lib` 디렉토리로 내려받자.
```sh
$ wget --directory-prefix lib https://raw.githubusercontent.com/serverless/examples/92631fd709d603e295aa8f352937cce53ca24080/aws-node-rekognition-analysis-s3-image/lib/imageAnalyser.js
```

위 파일을 로드하여 사용할 랜들러 파일 `imageAnalyserHandler.js` 를 작성하자.
```js
// imageAnalyserHandler.js

const path = require('path')

const ImageAnalyser = require('./lib/imageAnalyser')
const bucket = process.env.SLS_BUCKET_NAME

module.exports.imageAnalysis = (event, context, callback) => {
  const imageName = path.join('images', event.pathParameters.key)
  console.log( 'Key: ' + imageName )
  ImageAnalyser.getImageLabels({ bucket, imageName })
  .then((Labels) => {
    const response = { statusCode: 200, body: JSON.stringify({ Labels }) }
    callback(null, response)

  }).catch((error) => {
    callback(error, null)
  })
}
```

`serverless.yml` 파일에 핸들러 설정과 iamRole 권한 설정을 추가하자.
```diff
$ git diff serverless.yml
diff --git a/serverless.yml b/serverless.yml
index f2f1220..549e9e0 100644
--- a/serverless.yml
+++ b/serverless.yml
@@ -27,6 +27,11 @@ provider:
         Fn::Join:
           - ""
           - - "arn:aws:s3:::${env:SLS_BUCKET_NAME}"
+    - Effect: Allow
+      Action:
+        - "rekognition:*"
+      Resource: "*"
+
   environment:
     SLS_BUCKET_NAME: ${env:SLS_BUCKET_NAME}

@@ -59,4 +64,10 @@ functions:
             - s3:ObjectCreated:*
           rules:
             - prefix: images/
+  imageAnalysis:
+    handler: imageAnalyserHandler.imageAnalysis
+    events:
+      - http:
+          path: "/analysis/{key}"
+          method: get
```

# react
~~비용 문제가 있을 뿐~~ Lambda function 의 한계는 없다. 마지막으로 **resize**,
**Rekognition** 기능을 확인하는 Web UI 를 제공해보자. webpack 을 이미 적용했기
때문에 `@babel/preset-react` 를 추가하여 어렵지 않게 `react` 도 도입을 할 수
있다.

```sh
$ yarn add react react-dom styled-jsx @babel/preset-react
```

```js
// lib/App.js

import React from 'react'

const Item = props =>
  <a href={props.detailLink}>
    <li>
      <img src={props.resizeUrl}/>
      <span>{props.filename}</span>
    </li>
  </a>

export default ({ objectList }) =>
  <React.Fragment>
    <ul>{objectList.map( o => <Item {...o} key={o.filename}/> )}</ul>
    <style jsx>{`
      li { margin: 10px; width: 160px; border: 1px solid red; float: left; }
      img { width: 100%; }
    `}</style>
  </React.Fragment>
```

```js
// lib/ImageDetail.js

import React from 'react'

export default ( props ) =>
  <div>
    <pre>{JSON.stringify(props.labels,null,2)}</pre>
    <img src={props.originalUrl}/>
    <style jsx>{`img { margin: 10px; width: 100%; }`}</style>
  </div>
```

html 페이지를 내려주는 `htmlHandler.js` 를 추가하자.

```js
// htmlHandler.js

import path from 'path'

import AWS from 'aws-sdk'
import React from 'react'
import compact from 'lodash/compact'
import find from 'lodash/find'
import { renderToString } from 'react-dom/server'
import { flushToHTML } from 'styled-jsx/server'

import App from './lib/App'
import ImageDetail from './lib/ImageDetail'
const ImageAnalyser = require('./lib/imageAnalyser')

const s3 = new AWS.S3()
const Bucket = process.env.SLS_BUCKET_NAME

Error.stackTraceLimit = 50
const headers = { 'Content-Type': 'text/html; charset=utf-8' }

export const index = (event, context, callback) => {
  s3.listObjects({ Bucket, Prefix: 'images/' }).promise()
  .then( data => {
    let objectList = data.Contents.map( ({ Key }) => {
      if( Key === 'images/' ) return null

      const filename = path.basename(Key)
      const resizeKey = path.join('resize',filename)
      const resizeUrl = s3.getSignedUrl('getObject', { Bucket, Key: resizeKey})
      const detailLink = `/dev/imageDetail/${filename}`
      return { filename, resizeUrl, detailLink }
    })
    objectList = compact(objectList)

    const html = renderToString(<App objectList={objectList}/>)
    const styledJsx = flushToHTML()
    const body = renderFullPage( html, styledJsx, { objectList })

    callback(null, { headers, statusCode: 200, body })
  }).catch( err => {
    console.log( 'err: ')
    console.log( err )
    callback( err )
  })
}

export const imageDetail = (event, context, callback) => {
  const Key = path.join('images',event.pathParameters.key)
  ImageAnalyser.getImageLabels({ bucket: Bucket, imageName: Key })
  .then( Labels => {
    const originalUrl = s3.getSignedUrl('getObject', { Bucket, Key })
    const props = { labels: Labels, originalUrl }
    const html = renderToString(<ImageDetail {...props}/>)
    const styledJsx = flushToHTML()
    const body = renderFullPage( html, styledJsx, props )

    callback(null, { headers, statusCode: 200, body })
  })
  .catch((error) => {
    console.log( 'err: ')
    console.log( err )
    callback( err )
  })
}

const renderFullPage = (html, styledJsx, props) => `
<!doctype html>
<html>
  <head>
    <meta charSet="utf-8" />
    <title>serverless react example</title>
    ${styledJsx}
  </head>
  <body>
    <div id="root">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = JSON.parse(${JSON.stringify(props).replace(/</g, '\\u003c')})
    </script>
  </body>
</html>
`
```

`serverless.yml` 에 function 을 추가하자.

```diff
$ git diff serverless.yml
diff --git a/serverless.yml b/serverless.yml
index 347e67d..b018a69 100644
--- a/serverless.yml
+++ b/serverless.yml
@@ -72,4 +72,10 @@ functions:
       - http:
           path: analysis/{key}
           method: get
+  index:
+    handler: htmlHandler.index
+    events:
+      - http:
+          path: /
+          method: get
+  imageDetail:
+    handler: htmlHandler.imageDetail
+    events:
+      - http:
+          path: imageDetail/{key}
+          method: get
```

`react` 의 `jsx` 문법을 사용할 수 있도록 `webpack` 에 설정을 추가하자:
```diff
$ git diff webpack.config.js
diff --git a/webpack.config.js b/webpack.config.js
index c076854..6dfaed3 100644
--- a/webpack.config.js
+++ b/webpack.config.js
@@ -11,7 +11,12 @@ module.exports = {
     rules: [{
       test: /\.js$/,
       exclude: /node_modules/,
-      loader: 'babel-loader',
+      use: [{
+        loader: 'babel-loader',
+        options: {
+          presets: ['@babel/react'],
+        },
+      }],
     }],
   },
   output: {
```

# 그 외
- [Per Stage Profiles][stage]
- [Reference Variables using SSM Parameter Store][ssm]
- Lambda@Edge
    - https://aws.amazon.com/ko/lambda/edge/?nc1=h_ls
    - https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/lambda-edge.html
- Lambda function 은 VPC 에 속할 수 있다.
    - Security Group 도 설정 가능
    - NAT 를 사용하여 public IP 고정 가능
    - VPC 내 자원들과 private IP 로 통신 가능
- https://github.com/dherault/serverless-offline
- https://www.npmjs.com/package/serverless-aws-alias
- https://github.com/FidelLimited/serverless-plugin-warmup

# References

- https://blog.rackspace.com/pets-cattle-and-nowinsects
- https://www.slideshare.net/awskorea/aws-lambda-100-sangpil-kim
- https://serverless.com/framework/docs/providers/aws/guide/deploying#how-it-works
- https://github.com/mgi166/serverless-image-resizer/blob/master/src/imageResizer.js
- https://brunch.co.kr/@tigeryoonz/16
- http://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0002145647
- https://blog.epsagon.com/how-to-handle-aws-lambda-errors-like-a-pro
- https://medium.com/buildit/a-b-testing-on-aws-cloudfront-with-lambda-edge-a22dd82e9d12
- https://dev.to/didil/serverless-testing-strategies-4g92

[serverless]: https://serverless.com/
[serverless_framework]: https://serverless.com/framework/
[aws_sdk_js]: https://github.com/aws/aws-sdk-js
[npx]: https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner
[sls_package]: https://www.npmjs.com/package/serverless
[webconsole_lambda]: https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions
[webconsole_cloudwatch]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:
[velopert_lambda]: https://velopert.com/3546
[aws_lambda]: https://aws.amazon.com/ko/lambda/?nc1=h_ls
[aws_apigateway]: https://aws.amazon.com/ko/api-gateway/?nc1=h_ls
[yaml]: http://yaml.org/
[lambda_execution_model]: https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/running-lambda-code.html
[yarn]: https://yarnpkg.com/en/
[npm]: https://www.npmjs.com/
[async]: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/async_function
[existings3]: https://github.com/matt-filion/serverless-external-s3-event
[webpack]: https://webpack.js.org/
[serverless_event]: https://serverless.com/framework/docs/providers/aws/events/
[dlq]: https://docs.aws.amazon.com/ko_kr/lambda/latest/dg/dlq.html
[examples]: https://github.com/serverless/examples
[rek_example]: https://github.com/serverless/examples/tree/master/aws-node-rekognition-analysis-s3-image
[stage]: https://serverless.com/framework/docs/providers/aws/guide/credentials#per-stage-profiles
[ssm]: https://serverless.com/framework/docs/providers/aws/guide/variables#reference-variables-using-the-ssm-parameter-store

