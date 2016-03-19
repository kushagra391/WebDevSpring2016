echo ">> committing latest changes"
git commit -am "$1"

echo ">> pushing to github"
git push webdev

echo ">> pushing to rhcloud"
git push 



