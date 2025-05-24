(
echo "===== Dockerfile ====="; cat Dockerfile
echo -e "\n===== docker-compose.yml ====="; cat docker-compose.yml
echo -e "\n===== docker-compose-prod.yml ====="; cat docker-compose-prod.yml
echo -e "\n===== heroku.yml ====="; cat heroku.yml
echo -e "\n===== requirements.txt ====="; cat requirements.txt

echo -e "\n===== backend/manage.py ====="; cat backend/manage.py

for f in asgi.py wsgi.py settings.py urls.py; do
  echo -e "\n===== backend/django_project/$f ====="
  cat backend/django_project/"$f"
done

for f in models.py serializers.py views.py urls.py admin.py; do
  if [ -f "backend/workorders/$f" ]; then
    echo -e "\n===== backend/workorders/$f ====="
    cat backend/workorders/"$f"
  fi
done

echo -e "\n===== frontend/package.json ====="; cat frontend/package.json
echo -e "\n===== frontend/vite.config.js ====="; cat frontend/vite.config.js
echo -e "\n===== frontend/index.html ====="; cat frontend/index.html

for p in App.jsx Router.jsx main.jsx index.css App.css; do
  if [ -f "frontend/src/$p" ]; then
    echo -e "\n===== frontend/src/$p ====="
    cat frontend/src/"$p"
  fi
done

find frontend/src/{components,pages,services,utils} -type f \( -iname "*.js" -o -iname "*.jsx" \) | sort | while read -r file; do
  echo -e "\n===== $file ====="
  cat "$file"
done
) > project_code_output.txt