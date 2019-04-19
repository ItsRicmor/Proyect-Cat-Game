export default class Tree {

    constructor(root = null) {
        this.root = root
    }
    isEmpty = () => this.root === null

    add = (value, node = null) => {
        if(isEmpty()) {
            this.root = new Node(value)
            return 
        }
        if(value < node.value){
            if(node.left){
                return this.recursionAdd(value, node.left)
            }
            node.left = new Node(value)
            return
        } else {
            if(node.right){
                return this.recursionAdd(value, node.right)
            }
            node.right = new Node(value)
            return
        }
        
    }

    preOrden = (node = this.root) => {
        if(!node) {
            return
        }
        output += node.value + ", "
        this.preOrden(node.left)
        this.preOrden(node.right) 
    }

}