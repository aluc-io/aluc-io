# aluc-io
https://aluc.io/ blog

## environment

example:
```
export AWS_ACCESS_KEY_ID=AKXXXXXXXXXXXXXXXXRA
export AWS_SECRET_ACCESS_KEY=kvxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxzZ
export AWS_DEFAULT_REGION=ap-northeast-2

export ALGOLIA_INDEX_NAME=algoria-index-name
export ALGOLIA_APP_ID=VXXXXXXXXI
export ALGOLIA_SEARCH_ONLY_API_KEY=f2xxxxxxxxxxxxxxxxxxxxxxxxxxxx87
export ALGOLIA_ADMIN_API_KEY=7dxxxxxxxxxxxxxxxxxxxxxxxxxxxx9c

export ALUCIO_PROJECT_NAME=alucio
export ALUCIO_S3BUCKET_NAME=s3-bucket-name
export ALUCIO_UTTERANCES_REPO=b6pzeusbc54tvhw5jgpyw8pwz2x6gs/aluc-io-comment
export ALUCIO_GOOGLE_ANALYTICS_TRACKING_ID=UA-XXXXXXXXX-X

terraform state pull > tmp.tfstate
export SLS_APIGW_ID=$(cat tmp.tfstate | jq -r '.modules[0].resources["aws_api_gateway_rest_api." + env.S3PREFIX].primary.id')
export SLS_APIGW_ROOT_RESOURCE_ID=$(cat tmp.tfstate | jq -r '.modules[0].resources["aws_api_gateway_rest_api." + env.S3PREFIX].primary.attributes.root_resource_id)
export SLS_APIGW_PROXY_RESOURCE_ID=$(cat tmp.tfstate | jq -r '.modules[0].resources["aws_api_gateway_resource." + env.S3PREFIX].primary.id')

export TF_VAR_PROJECT_NAME=$ALUCIO_PROJECT_NAME
export TF_VAR_BUCKET_NAME=$ALUCIO_S3BUCKET_NAME
export TF_VAR_ROUTE53_ZONE_NAME=aluc.io
export TF_VAR_BLOG_DOMAIN=aluc.io
```

## Running in development

```
$ yarn dev
```

## Deploy
refer to `.circleci/config.yml`

