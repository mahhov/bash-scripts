git-rst() {
    # print current commit during rebase, `<sha> <commit message>`
    if [ -d ".git/rebase-apply" ]; then
        git log --pretty=oneline --abbrev-commit -n1  `cat .git/rebase-apply/original-commit`
    elif [ -d ".git/rebase-merge" ]; then
        git log --pretty=oneline --abbrev-commit -n1  `cat .git/rebase-merge/stopped-sha`
    fi
}

git-rlog() {
    # print log from rebase base to rebase head and highlight current commit
    GREP_COLOR='1;36'
    if [ -d ".git/rebase-apply" ]; then
        git log --pretty=oneline --abbrev-commit `cat .git/rebase-apply/onto`^..`cat .git/rebase-apply/orig-head` | grep --color "`git-rst`\|"
    elif [ -d ".git/rebase-merge" ]; then
        git log --pretty=oneline --abbrev-commit `cat .git/rebase-merge/onto`^..`cat .git/rebase-merge/orig-head` | grep --color "`git-rst`\|"
    fi
}

git-rcont() {
    # continue a rebase
    git add . && git rebase --continue
    git-rlog
}

alias git-rebase-status='git-rst'
alias git-rebase-log='git-rlog'
alias git-rebase-continue='git-rcont'