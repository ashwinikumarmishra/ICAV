# Technical challenges for Software Engineer position

> Please create a Git Repository for this challenge and commit all answers to it. 
Please keep this organised and commit with clear messages. 
Share the link with us once complete.

## Basics

> These questions have multiple correct answers. They are meant to test your knowledge.

1. What is "N + 1" problem in REST APIs and how would you solve it?
A:- The N+1 problem is a situation where client applications are required to call the server N+1 
	times to fetch one collection resource, because of collection resources not had enough 
	information about child resources.
	
	To Solve this issue we need to add optional query string parameters like below
	ShowAllChilds:0 OR 1 		//0 means no child item 1 means all child items
	ShowItem: 1 				//Item from 1st index
	ShowItemRange: 1-N 			//Item from from  1 to N index
	ShowItemConditional: name Like/eq/NotLike etc '%Sub%' // Items which satisfies this condition(s)
	
	Using these optional parameters user can control how they want to see data of child items.
	 
2. When do you stop writing unit tests?
A. There are lots of benefits of having unit test, its better to have units tests. 
   This gives us lots of benefits out of those few of them listed below:-
   
   #	Finds Software Bugs Early
   #	Quality of Code
   #	Faster development cycle
   #	Helps in debugging
   #	Reduce Costs
   #	Simplyfies Changes and Integration
   #	Enables Agile developent
   
   In terms of when we should stop writing unit test cases, 
   in below conditions we should stop writing unit tests.
   #	When component development has been completed
   		and end-to-end testing required, this is time when QA team should write end-to-end 
   		test script.
		
   #   When application is more of UI/functional testing which is hard to cover in unit testing.
   
3. Why would one use monorepos?
A.  Using Monorepos gives blow benefits:-
	
	# Easy to maintain & administer
	# Store all source code at one location 
	# Easy to share and collaborate & reuse with multiple teams.
	# Single source of truth.
	# Avoid merging
	# Changes visible to all teams
	

4. What is Liskov substitution principle?
A. According to Likov's Substitution Principle the reference to the base class can be replaced 
   with a derived class without affecting the functionality of the program module.
   
   i.e. A object of Car can be replaced with Object of BMW Car and all features of Car object 
   should available in BMW car Object.
   
5. How do you avoid race conditions?
A. To avoid race condition we should serialize access to the shared resource. If one process 
   gains access first, then it should lock that resource so that other processes have to wait 
   for the resource to become available. This allows the first process to access and update the 
   resource safely. Once done, it will "release" the resource. One of the processes waiting on 
   the resource will now get its chance to access the resource. The idea of granting access to 
   only one process is called mutual exclusion.
   
6. What is the first thing you do when you encounter a bug?
A. Capture replication steps
	

## "Why would anyone do drugs when they can just mow a lawn?"

> For this challenge, user authentication is **not** required. There is no time limit. 
Assume that the frontend is handled by another developer.

- **Language**: _JavaScript_ (TypeScript is preferrable, but not required)
- **Framework**: _NestJS_
- **Database**: _MongoDB_

Hank likes to mow the lawn. Back in the day, he would offer his services to his neighbors for a fee. 
Now, he wishes to start a company around this.
As his friend, he asked if you can help him digitize the business. 
Users would register on the website, then book visits from their dashboard. 
One of the requirements he specified is to have scalable pricing; 
To mow 1 square metre, the client will have to pay £1. 
If the area is bigger than 15 square metres, a discount of 10% will be applied. 
If the area is bigger than 25  square metres, a discount of 15% will be applied. 
To acquire new clients, Billy wants to have a coupon system in place as well.

## Future of lawn mowing endeavours

> This section has no correct answers. Albeit optional, your answers will help us understand your thinking process.

1. What other features would you like to add?
A. 
	#Features to customers
		# Auto Reschedule Prompt to Customers
		# Reminders
		# Preferred Timings
		# Multple Payment Options
		# Mobile App
		# Chatbot integration for seamless booking		
		# Re-schedule option
		# Upload pics at the time of booking so that, worker will have idea in advance that 
		  what kind of effort he has to put on
		# Booking schedule alert, at what time booking done show alert that customer will 
		  available at home at that time
		# Price calculator
		# Price trends- means in what timings price are are low.
		# Feedback & Suggestions
		# Ratings
		
		
	
	#Features to service provider
		# Reschedule follow-up alert to Service provider So that he can follow up with customers 
		# Third party app integration for better promotion and offers
		# Multiple payment platform integration.
		# Reward system for customers
		# Convienent booking adjustment
		# Multiple coopon provider integration.		
		# Verious reports, i.e. areawise report
		# API for integration with other apps & platforms
		# Booking trends reports
		# Customer Feedback, Suggestions & Ratings analysis
		# Intractive dashboards
		# Mobile App
		# Capture pic option
		
2. How would you handle user authentication?
A.	considering the nature and usage of app customer will not access this site very frequently, 
   	and in this scenario remembering credential is dificult so I will prefer to authenticate 
   	via regsitered contact number & OTP. laong with that following options can be used:-
	   # Mark cookies as secure
	   # Use CSRF protection
	   # Same-origin policy
	   # Session expiry
   
   
3. How would you deploy the solution in an enterprise environment?
A.

	# Keep installation simple
	# Take adavange of latest tehnologies and tools, AWS, docker, kebernetes etc.
	# Automate deployment process
	# Secure deployment
	# Checklist
	# CICD using Jenkins
	# Post deploymennt atomated smoke tests.
	# Rollback tools
	# Plan B








