export default class CommitCardList {
    constructor(makeCommits,container) {
        this.makeCommits = makeCommits;
        this.container = container;
    }
    addCard(commitObject) {
        const commit = this.makeCommits(commitObject);
        this.container.appendChild(commit);
    }
    render(data) {
        this.data = data.forEach((item) => {
            if (item.author !== null) {
                this.addCard(item)
            }
            else {
                return false
            }
        })
    }
}