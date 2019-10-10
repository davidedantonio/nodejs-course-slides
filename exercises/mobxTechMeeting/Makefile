port := 3000

start:
	@docker-compose -f ./docker-compose.yml up

stop:
	@docker-compose -f ./docker-compose.yml down

create-user:
	@curl \
		--silent \
		-X POST \
		http://localhost:$(port)/auth/signup \
		-H 'Content-Type: application/json' \
		-d '{"username":"$(username)","password":"$(password)","fullName":"$(fullName)"}' \
		| jq .

login:
	@curl \
		--silent \
		-X POST \
		http://localhost:$(port)/auth/signin \
		-H 'Content-Type: application/json' \
		-d '{"username":"$(username)","password":"$(password)"}' \
		| jq .

create-ticket:
	@curl \
		--silent \
		-X POST \
		http://localhost:$(port)/api/tickets \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(token)' \
		-d '{"title":"$(title)","body":"$(body)"}' \
		| jq .

get-tickets:
	@curl \
		--silent \
		-X GET \
		http://localhost:$(port)/api/tickets \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(token)' \
		| jq .

get-single-ticket:
	@curl \
		--silent \
		-X GET \
		http://localhost:$(port)/api/tickets/$(ticketId) \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(token)' \
		| jq .

get-me:
	@curl \
		--silent \
		-X GET \
		http://localhost:$(port)/api/users/me \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(token)' \
		| jq .

get-users:
	@curl \
		--silent \
		-X GET \
		http://localhost:$(port)/api/users/list \
		-H 'Content-Type: application/json' \
		-H 'Authorization: Bearer $(token)' \
		| jq .
