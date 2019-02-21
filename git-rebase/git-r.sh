git-rsha() {
  # print sha of current commit during rebase`
  if [ -d ".git/rebase-apply" ]; then
      cat .git/rebase-apply/original-commit
  elif [ -d ".git/rebase-merge" ]; then
      cat .git/rebase-merge/stopped-sha
  fi
}

git-rst() {
    # print current commit during rebase, `<sha> <commit message>`
    git log --pretty=oneline --abbrev-commit -n1  `git-rsha`
}

git-rlog() {
    # print log from rebase base to rebase head and highlight current commit
    GREP_COLOR='1;36'
    if [ -d ".git/rebase-apply" ]; then
        git log --pretty=oneline --abbrev-commit `cat .git/rebase-apply/onto`^..`cat .git/rebase-apply/orig-head` | grep --color "`git-rst`\|"
    elif [ -d ".git/rebase-merge" ]; then
        git log --pretty=oneline --abbrev-commit `cat .git/rebase-merge/onto`^..`cat .git/rebase-merge/orig-head` | grep --color "`git-rst`\|"
    fi

    echo ''
    git diff --name-only --diff-filter=U
}

git-rcont() {
    # continue a rebase
    git add . && git rebase --continue
    git-rlog
}

git-rshow() {
    git show `git-rsha`
}

alias git-rebase-sha='git-rsha'
alias git-rebase-status='git-rst'
alias git-rebase-log='git-rlog'
alias git-rebase-continue='git-rcont'
alias git-rebase-show='git-rshow'
