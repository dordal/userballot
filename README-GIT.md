GIT INSTRUCTIONS
================

We use git for source code management. To checkout the repo, follow the instructions on github:

git clone https://github.com/dordal/userballot.git

Main Branches
-------------

We'll have two permanent branches:

- master: This is production ready code, and can be pushed at any time.
- develop: This is the integration branch; all completed features get checked in here and pushed to staging for review.

Feature Branches
----------------

Every time you want to build a feature (e.g. analytics or redoing the website) you create a feature branch. For now, you don't need to do this if you just want to do some tiny change ( e.g. fix a spelling mistake ), but anything that will take more than an hour or two should go into a feature branch. By convention, I suggest we prefix them with our username:

git checkout -b dordal-some-great-feature develop

Now you edit some files in your branch, and check them in as normal. You can do this for a while....

vi www/index.php   <-- make changes
git commit -a -m'changed index.php'
git push origin dordal-some-great-feature

Eventually, you'll want to get ready to merge your feature branch back into the main develop branch. First, you merge any changes from development into the feature branch:

git merge develop

Once you've tested everything, you'll now switch back over to the develop branch, and merge your commit there:

git checkout develop
git merge --no-ff dordal-some-great-feature
git push origin develop

Now delete your feature branch
git branch -d dordal-some-great-feature
git push origin :dordal-some-great-feature

When we're ready to push code out, we merge develop into master:

git checkout master
git merge --no-ff develop
git push

... and then of course the 'git pull' on the production box.

If you're curious for some background on why we're using --no-ff, or how we came up with this model, see here: http://nvie.com/posts/a-successful-git-branching-model/

