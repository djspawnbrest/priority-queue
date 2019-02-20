const Node= require('./node');

class MaxHeap{
    constructor(){
        this.root=null;
        this.parentNodes=[];
    }

    push(data, priority){
        let node=new Node(data,priority);
        this.insertNode(node);
        this.shiftNodeUp(node);

        return node;
    }

    pop(){
        if(this.isEmpty()) return false;

        let root=this.detachRoot();
        let newRoot=this.restoreRootFromLastInsertedNode(root);
        this.shiftNodeDown(newRoot);
        return root.data;
    }

    detachRoot(){
        if(!this.root) return false;
        let root=this.root;

        if (this.size==1) {
            this.parentNodes=[];
        }
        else {
            if (this.parentNodes[0]==this.root){
                this.parentNodes.shift();
            }
        }
        this.root=null;
        return root;
    }

    restoreRootFromLastInsertedNode(detached){
        if(!detached) return false;

        this.root=this.parentNodes[this.parentNodes.length-1];
        if(this.root){
            if(this.root.parent){
                this.root.parent.left==this.root?this.root.parent.left=null:this.root.parent.right=null
                if(this.parentNodes[0]!==this.root.parent) this.parentNodes.unshift(this.root.parent);
                this.root.parent=null;
            }

            this.parentNodes.pop();
            if(detached.right&&detached.right!==this.root){
                this.root.right=detached.right;
                detached.right.parent=this.root;
            }
            else {
                this.parentNodes.shift();
                this.parentNodes.unshift(this.root);
            }
            if (detached.left&&detached.left!==this.root){
                this.root.left=detached.left;
                detached.left.parent=this.root;
            }
        }
        return this.root;
    }

    size(){
        let length=0;
        if(this.root){
            length=this._sizeHeap(this.root)+1;
        }
        return length;
    }

    _sizeHeap(node){
        if(!node) return false;
        let length=0;
        if(node){
            if(node.left){
                length+=this._sizeHeap(node.left)+1;
            }
            if(node.right){
                length+=this._sizeHeap(node.right)+1;
            }
        }
        return length;
    }


    isEmpty(){
        return !!(this.root===null&&this.parentNodes.length==0);
    }

    clear(){
        this.root=null;
        this.parentNodes=[];
    }

    insertNode(node){
        if (this.root===null) {
            this.root=node;
            this.parentNodes.push(node);
        }
        else {
            let firstParent=this.parentNodes[0];
            if(firstParent.right&&firstParent.left){
                this.parentNodes.shift();
                firstParent = this.parentNodes[0];
            }
            this.parentNodes.push(node);
            firstParent.appendChild(node);

            if(firstParent.right&&firstParent.left){
                this.parentNodes.shift();
            }
        }
        return node;
    }

    shiftNodeUp(node){
        if(node.parent===null||node.priority<=node.parent.priority){
            if(node.parent===null){
                this.root=node;
            }
            return false;
        }
        else {
            this._parentNodesInCorrectState(this.parentNodes,node,node.parent);
            return this.shiftNodeUp(node.swapWithParent());
        }
    }

    _parentNodesInCorrectState(arr,node,nodeChange){
        if(arr.indexOf(node)!==-1&&arr.indexOf(nodeChange)!==-1){
            let tmp = arr[arr.indexOf(node)];
            arr[arr.indexOf(node)]=arr[arr.indexOf(nodeChange)];
            arr[arr.indexOf(nodeChange)]=tmp;
        }
        if(arr.indexOf(node)!==-1&&arr.indexOf(nodeChange)===-1){
            arr[arr.indexOf(node)] = nodeChange;
        }
        return arr;
    }

    shiftNodeDown(node){
        if(!node) return false;
        if(node.left||node.right){
            let lftFlg = true;
            if(node.left&&node.right){
                if(node.left.priority<node.right.priority){
                    lftFlg=false;
                }
            }
            if(node.left&&node.left.priority>node.priority&&lftFlg){
                if(node.parent===null){
                    this.root=node.left;
                }
                this._parentNodesInCorrectState(this.parentNodes,node.left,node);
                node.left.swapWithParent();
                return this.shiftNodeDown(node);
            }
            if(node.right&&node.right.priority> node.priority){
                if (node.parent===null){
                    this.root=node.right;
                }
                this._parentNodesInCorrectState(this.parentNodes,node.right,node);
                node.right.swapWithParent();
                return this.shiftNodeDown(node);
            }
        }
        return false;
    }
}

module.exports = MaxHeap;