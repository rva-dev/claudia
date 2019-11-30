/*global describe, expect, it */
const aws = require('aws-sdk'),
	awsRegion = require('./util/test-aws-region'),
	listWrappableFunctions = require('../src/util/list-wrappable-functions'),
	iam = new aws.IAM({region: awsRegion}),
	s3 = new aws.S3({region: awsRegion});
describe('listWrappableFunctions', () => {
	'use strict';
	it('should identify methods', () => {
		expect(listWrappableFunctions(iam)).toContain('createRole');
	});
	it('should ignore generic methods', () => {
		expect(listWrappableFunctions(iam)).not.toContain('makeRequest');
	});
	it('should ignore constructors', () => {
		expect(listWrappableFunctions(iam)).not.toContain('constructor');
	});
	it('should include super-prototype methods', () => {
		expect(listWrappableFunctions(s3)).toContain('upload');
	});
	it('should not contain any properties', () => {
		expect(listWrappableFunctions({ a: () => {}, b: 5 })).toEqual(['a']);
	});
});
