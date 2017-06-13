var SCS = function (ak,sk,bt) {
    "use strict";
    var bucket = bt;
    var aws_access_key_id = ak;
    var aws_secret_access_key = sk;
    var aws_signature;
    var protocolurl = 'http://';

    var s3url = '.sinacloud.net';
    var aws_canned_acl = 'public-read';
    var aws_policy_document;
    var aws_policy_document_b64;

    var upload_form = function () {

        make_aws_policy_document();
        aws_signature = sign(aws_secret_access_key, aws_policy_document_b64);

        var data ={
            url: protocolurl + bucket + s3url + '/',
            type: 'POST',
            formData: {
                key: '${filename}',
                AWSAccessKeyId: aws_access_key_id,
                acl: aws_canned_acl,
                Policy: aws_policy_document_b64,
                Signature: aws_signature
            }
        }

        return data;
    };

    var make_aws_policy_document = function () {
        aws_policy_document = '{"expiration":"2020-12-01T12:00:00.000Z","conditions":[{"bucket":"' + bucket + '"},{"acl":"' + aws_canned_acl + '"},["eq","$acl","' + aws_canned_acl + '"],["starts-with","$key",""]]}';
        aws_policy_document_b64 = rstr2b64(aws_policy_document);
    };

    var sign_api = function (expires, resource) {
        var http_verb = 'GET';
        var canonicalized_resource = '/' + bucket + resource;
        var string_to_sign = http_verb + "\n\n\n" + expires + "\n" + canonicalized_resource;
        var sig = b64_hmac_sha1(aws_secret_access_key, string_to_sign);
        return sig;
    };

    var sign = function(aws_secret_access_key, string_to_sign) {
        var sig = b64_hmac_sha1(aws_secret_access_key, string_to_sign);
        return sig;
        // Authorization: AWS AWSAccessKeyId:Signature
        // http://docs.amazonwebservices.com/AmazonS3/2006-03-01/dev/RESTAuthentication.html
    };

    return {
        upload:function (args) {
            return upload_form();
        }
    };

}
