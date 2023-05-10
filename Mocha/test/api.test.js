var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

//Testing API: http://localhost:8080/app/goal
describe('Test "Get Multiple Goals"', function () {
	var requestResult;
	var response;
		 
    before(function (done) {
        chai.request("http://localhost:8080")
			.get("/app/goal")
			.end(function (err, res) {
				requestResult = res.body;
				response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
				done();
			});
        });
    
    it('Should return an array object with more than 1 object', function (){
		expect(response).to.have.status(200);
		expect(response.body).to.have.length.above(2);
		expect(response).to.have.headers;
    });
    
	it('The first entry in the array has known properties', function(){
	    expect(requestResult[0]).to.include.keys('description');
	    expect(requestResult[0]).to.have.property('_id');
		expect(response.body).to.not.be.a.string;
	});
	it('The elements in the array have the expected properties', function(){
		expect(response.body).to.satisfy(
			function (body) {
				for (var i = 0; i < body.length; i++) {
					expect(body[i]).to.have.property('title');
					expect(body[i]).to.have.property('description');
					expect(body[i]).to.have.property('goalId');
					expect(body[i]).to.have.property('userId');
					expect(body[i]).to.have.property('startDate');
					expect(body[i]).to.have.property('endDate');
					expect(body[i]).to.have.property('category');
					expect(body[i]).to.have.property('reminder');
					expect(body[i]).to.have.property('progress');
					expect(body[i]).to.have.property('userId').that.is.a('string');
				}
				return true;
			});
	});	
	
});

//Testing API: http://localhost:8080/app/goal/1
describe('Test "Get Single Goal"', function () {
		var requestResult;
		var response;
			 
		before(function (done) {
			chai.request("http://localhost:8080")
				.get("/app/goal/1")
				.end(function (err, res) {
					requestResult = res.body;
					response = res;
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					done();
				});
			});
		
		it('Should return an array object with 1 object', function (){
			expect(response).to.have.status(200);
			expect(response).to.have.headers;
		});

		it('should have a valid start and end date', () => {
			const endDate = new Date(response.body.endDate);
			const startDate = new Date(response.body.startDate);
			expect(endDate).to.be.a('Date');
			expect(startDate).to.be.a('Date');
		  });

		it('should have the category as Health', () => {
			expect(response.body.category).to.equal('Health');
		  });

		it('should have the correct progress', () => {
			const allowedValues = ['Not Started', 'In Progress', 'Completed'];
  			expect(response.body.progress).to.be.oneOf(allowedValues);
		  });

		it('should have a boolean value for reminder', () => {
			expect(response.body.reminder).to.be.a('boolean');
		  });

		it('The elements in the array have the expected properties', function(){
			expect(response.body).to.have.property('title');
			expect(response.body).to.have.property('description');
			expect(response.body).to.have.property('goalId');
			expect(response.body).to.have.property('userId');
			expect(response.body).to.have.property('startDate');
			expect(response.body).to.have.property('endDate');
			expect(response.body).to.have.property('category');
			expect(response.body).to.have.property('reminder');
			expect(response.body).to.have.property('progress');
			expect(response.body).to.have.property('userId').that.is.a('string');
		});
	});

	describe('Test "Get Goals By Category"', function () {
			var requestResult;
			var response;
				 
			before(function (done) {
				chai.request("http://localhost:8080")
					.get("/app/goal?category=Health")
					.end(function (err, res) {
						requestResult = res.body;
						response = res;
						expect(err).to.be.null;
						expect(res).to.have.status(200);
						done();
					});
				});
			
			it('Should return an array object with at least 1 object', function (){
				expect(response).to.have.status(200);
				expect(response).to.have.headers;
			});
			
			it('The entry in the array has known properties', function(){
				expect(requestResult[0]).to.include.keys('description');
				expect(requestResult[0]).to.have.property('reminder');
				expect(response.body).to.not.be.a.string;
			});
			it('The elements in the array have the expected properties', function(){
				expect(response.body).to.satisfy(
					function (body) {
						for (var i = 0; i < body.length; i++) {
							expect(body[i]).to.have.property('title');
							expect(body[i]).to.have.property('description');
							expect(body[i]).to.have.property('goalId');
							expect(body[i]).to.have.property('userId');
							expect(body[i]).to.have.property('startDate');
							expect(body[i]).to.have.property('endDate');
							expect(body[i]).to.have.property('category');
							expect(body[i]).to.have.property('reminder');
							expect(body[i]).to.have.property('progress');
							expect(body[i]).to.have.property('userId').that.is.a('string');
						}
						return true;
					});
			});	
			
		});