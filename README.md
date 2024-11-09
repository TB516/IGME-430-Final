#Client deploy: 
    - pnpm --filter client build:image
    - heroku login
    - heroku container:login
    - docker push registry.heroku.com/elden-ring-app/web
    - heroku container:release web --app=elden-ring-app


#Server deploy: 
    - pnpm --filter server build:image
    - heroku login
    - heroku container:login
    - docker push registry.heroku.com/elden-ring-api/web
    - heroku container:release web --app=elden-ring-api