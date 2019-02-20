class Node{
    constructor(data,priority){
        this.data=data;
        this.priority=priority;
        this.parent=null;
        this.left=null;
        this.right=null;
    }

    appendChild(node){
        if(this.left===null){
            this.left=node;
            node.parent=this;
        }else if(this.right===null){
            this.right=node;
            node.parent=this;
        }else{
            return false;
        }
        return node;
    }

    removeChild(node){
        if(this.left===node){
            node.parent=null;
            this.left=null;
        }else if(this.right===node){
            node.parent=null;
            this.right=null;
        }else{
            throw "Error";
        }
        return node;
    }

    remove(){
        if(this.parent===null){
            return false;
        }
        this.parent.removeChild(this);
        return this;
    }


    swapWithParent(){
        if(this.parent===null){
            return false;
        }

        let node=this;
        let prnt=this.parent;

        if(prnt.parent!==null){
            node.parent=prnt.parent;
            (prnt.parent.left==prnt)?prnt.parent.left=node:prnt.parent.right=node;
        }else{
            node.parent=null;
        }

        prnt.parent=node;
		let rightBro;
		let leftBro;
        if(prnt.right!==null&&prnt.left!==null){
            if(prnt.left==node){
                rightBro=prnt.right;
                rightBro.parent=node;
            }else{
                leftBro=prnt.left;
                leftBro.parent=node;
            }
        }
		let leftNode;
        if(node.left!==null){
            leftNode = node.left;
            prnt.left = leftNode;
            leftNode.parent = prnt;
        }else{
            prnt.left=null;
        }
		let rightNode;
        if(node.right!==null){
            rightNode=node.right;
            rightNode.parent=prnt;
            prnt.right=rightNode;
        }else{
            prnt.right=null;
        }

        if(rightBro||leftBro){
            if (rightBro){
                node.right=rightBro;
                node.left=prnt;
            }else{
                node.left=leftBro;
                node.right=prnt;
            }
        }else{
            node.left=prnt;
        }
        return node;
    }
}

module.exports=Node;