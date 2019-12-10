export default function(blocks) {

	console.log(this)
	console.log(blocks)

	for (let key in blocks) {
		this.append(blocks[key])
	}
}