const octokat = require('octokat');

class Commit {
  constructor({ repo, token, username }) {
    if (!repo || !token || !username) {
      throw 'one or more parameters missing';
    }

    const octo = new octokat({
      token
    });

    this.repo = octo.repos(username, repo);
  }

  fetchHead(branchName) {
    return this.repo.git.refs.heads(branchName).fetch();
  }

  fetchTree(branchName) {
    return this.fetchHead(branchName).then(commit => {
      this.head = commit;
      return this.repo.git.trees(commit.object.sha).fetch();
    });
  }

  async createBlob(content) {
    return this.repo.git.blobs.create({
      content,
      encoding: 'utf-8'
    });
  }

  async createNewTree(files){
    return Promise.all(files.map( ({content, path}) => {
      return {
        path,
        mode: '100644',
        type: 'blob',
        sha: await this.createBlob(content).sha
      }
    } ));
  }

  create({ branchName, files, message }) {
    return this.fetchTree(branchName)
    .then(tree => this.repo.git.tree.create({
      tree: await this.createNewTree(files),
      base_tree: tree.sha
    }))
    .then( tree => this.repo.git.commits.create({
        message,
        tree: tree.sha,
        parents: [this.head.object.sha]
      })
    )
    .then( commit =>
      this.repo.git.refs.heads(branchName).update({
        sha: commit.sha
      })
    );

  }
}

module.exports = Commit;
