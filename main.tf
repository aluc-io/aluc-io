variable "BUCKET_NAME" {
}

variable "ROUTE53_ZONE_NAME" {
}

variable "BLOG_DOMAIN" {
}

variable "PROJECT_NAME" {
}

data "aws_region" "current" {
}

terraform {
  backend "s3" {
    bucket  = "aluc.io"
    key     = "terraform-state"
    region  = "ap-northeast-2"
    encrypt = true
  }
}

resource "aws_cloudfront_distribution" "main" {
  origin {
    domain_name = "${aws_api_gateway_rest_api.prod.id}.execute-api.${data.aws_region.current.name}.amazonaws.com"
    origin_path = "/prod"
    origin_id   = "prod"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_protocol_policy   = "https-only"
      origin_ssl_protocols     = ["TLSv1", "TLSv1.1", "TLSv1.2"]
      origin_keepalive_timeout = 60
      origin_read_timeout      = 60
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "Some comment"
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = "${aws_s3_bucket.log_bucket.id}.s3.amazonaws.com"
    prefix          = "cloudfront"
  }

  aliases = ["aluc.io"]

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "prod"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 30
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = "production"
  }

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = data.aws_acm_certificate.alucio.arn
    ssl_support_method             = "sni-only"
  }
}

resource "aws_api_gateway_rest_api" "prod" {
  name        = "${var.PROJECT_NAME}-prod"
  description = "This is my API for demonstration purposes"
}

resource "aws_api_gateway_resource" "prod" {
  rest_api_id = aws_api_gateway_rest_api.prod.id
  parent_id   = aws_api_gateway_rest_api.prod.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_rest_api" "latest" {
  name        = "${var.PROJECT_NAME}-latest"
  description = "This is my API for demonstration purposes"
}

resource "aws_api_gateway_resource" "latest" {
  rest_api_id = aws_api_gateway_rest_api.latest.id
  parent_id   = aws_api_gateway_rest_api.latest.root_resource_id
  path_part   = "{proxy+}"
}

/*
resource "aws_acm_certificate" "cert" {
  domain_name       = "aluc.io"
  subject_alternative_names = ["*.aluc.io"]
  validation_method = "DNS"
}
resource "aws_route53_record" "cert_validation" {
  name    = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_name}"
  type    = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_type}"
  zone_id = "${data.aws_route53_zone.main.id}"
  records = ["${aws_acm_certificate.cert.domain_validation_options.0.resource_record_value}"]
  ttl     = 60
}
resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = "${aws_acm_certificate.cert.arn}"
  validation_record_fqdns = ["${aws_route53_record.cert_validation.fqdn}"]
}
resource "aws_api_gateway_domain_name" "alucio" {
  domain_name              = "aluc.io"
  regional_certificate_arn = "${aws_acm_certificate_validation.cert.certificate_arn}"
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}
*/

/*
resource "aws_route53_record" "to_apigateway" {
  name    = "${aws_api_gateway_domain_name.alucio.domain_name}"
  type    = "A"
  zone_id = "${data.aws_route53_zone.main.id}"

  alias {
    evaluate_target_health = true
    name                   = "${aws_api_gateway_domain_name.alucio.regional_domain_name}"
    zone_id                = "${aws_api_gateway_domain_name.alucio.regional_zone_id}"
  }
}
*/

provider "aws" {
  version = "~> 2.0"
}

provider "aws" {
  alias  = "virginia"
  region = "us-east-1"
}

data "aws_acm_certificate" "alucio" {
  domain      = "aluc.io"
  types       = ["AMAZON_ISSUED"]
  most_recent = true
  provider    = aws.virginia
}

resource "aws_s3_bucket" "main" {
  bucket = var.BUCKET_NAME
  acl    = "public-read"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${var.BUCKET_NAME}/*"
    }
  ]
}
EOF

}

resource "aws_s3_bucket" "log_bucket" {
  bucket = "aluc.io-log"
  acl    = "log-delivery-write"
}

data "aws_route53_zone" "main" {
  name         = "${var.ROUTE53_ZONE_NAME}."
  private_zone = false
}

resource "aws_route53_record" "main" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.BLOG_DOMAIN
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.main.domain_name
    zone_id                = aws_cloudfront_distribution.main.hosted_zone_id
    evaluate_target_health = true
  }
}

