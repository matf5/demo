/** 
 * 
$ib inline-block
$borderColor lightgreen
div
  p
    border 1px solid $borderColor
  color darkkhaki
  .a-b
    background-color lightyellow
    [data]
      padding 15px
      font-size 12px
.d-ib
  display $ib
*/

var fs=require('fs');
  
fs.readFile('./test.txt','utf-8',function(err,data){
    if(err){
        console.error(err);
    }
    else{
        console.log(data);
        const a = parse(tokenize(data));
        console.log(a);
        console.log('----');
        console.log(JSON.stringify(transform(a)));
    }
});
const text1 = ['$ib inline-block',
'$borderColor lightgreen',
'div',
'  p',
'    border 1px solid $borderColor',
'  color darkkhaki',
'  .a-b',
'    background-color lightyellow',
'    [data]',
'      padding 15px',
'      font-size 12px',
'.d-ib',
'  display $ib'].join("");
function tokenize(text) {
    return text.trim().split(/\n|\r\n/).reduce((tokens, line, idx) => {
      const spaces = line.match(/^\s+/) || ['']
      const indent = spaces[0].length
      const input = line.trim()
      const words = input.split(/\s/)
      let value = words.shift()
      if (words.length === 0) {
        tokens.push({
          type: 'selector',
          value,
          indent
        })
      } else {
        let type = ''
        if (/^\$/.test(value)) {
          type = 'variableDef'
        } else if (/^[a-zA-Z-]+$/.test(value)) {
          type = 'property'
        } else {
          throw new Error(`Tokenize error:Line ${idx} "${value}" is not a vairable or property!`)
        }
        tokens.push({
          type,
          value,
          indent
        })
        while (value = words.shift()) {
          tokens.push({
            type: /^\$/.test(value) ? 'variableRef' : 'value',
            value,
            indent: 0
          })
        }
      }
      return tokens;
    }, [])
  }

  function parse(tokens) {
      var ast = {
        type: 'root',
        children: [],
        indent: -1
      };
      let path = [ast]
      let preNode = ast
      let node
      let vDict = {}
      while (node = tokens.shift()) {
        if (node.type === 'variableDef') {
          if (tokens[0] && tokens[0].type === 'value') {
            const vNode = tokens.shift()
            vDict[node.value] = vNode.value
          } else {
            preNode.rules[preNode.rules.length - 1].value = vDict[node.value]
          }
          continue;
        }
        if (node.type === 'property') {
          if (node.indent > preNode.indent) {
            preNode.rules.push({
              property: node.value,
              value: []
            })
          } else {
            let parent = path.pop()
            while (node.indent <= parent.indent) {
              parent = path.pop()
            }
            parent.rules.push({
              property: node.value,
              value: []
            })
            preNode = parent
            path.push(parent)
          }
          continue;
        }
        if (node.type === 'value') {
          try {
            preNode.rules[preNode.rules.length - 1].value.push(node.value);
          } catch (e) {
            console.error(preNode)
          }
          continue;
        }
        if (node.type === 'variableRef') {
          preNode.rules[preNode.rules.length - 1].value.push(vDict[node.value]);
          continue;
        }
        if (node.type === 'selector') {
          const item = {
            type: 'selector',
            value: node.value,
            indent: node.indent,
            rules: [],
            children: []
          }
          if (node.indent > preNode.indent) {
            path[path.length - 1].indent === node.indent && path.pop()
            path.push(item)
            preNode.children.push(item);
            preNode = item;
          } else {
            let parent = path.pop()
            while (node.indent <= parent.indent) {
              parent = path.pop()
            }
            parent.children.push(item)
            path.push(item)
          }
        }
      }
      return ast;
    }
    function parse(tokens) {
        var ast = {
          type: 'root',
          children: [],
          indent: -1
        };
        let path = [ast]
        let preNode = ast
        let node
        let vDict = {}
        while (node = tokens.shift()) {
          if (node.type === 'variableDef') {
            if (tokens[0] && tokens[0].type === 'value') {
              const vNode = tokens.shift()
              vDict[node.value] = vNode.value
            } else {
              preNode.rules[preNode.rules.length - 1].value = vDict[node.value]
            }
            continue;
          }
          if (node.type === 'property') {
            if (node.indent > preNode.indent) {
              preNode.rules.push({
                property: node.value,
                value: []
              })
            } else {
              let parent = path.pop()
              while (node.indent <= parent.indent) {
                parent = path.pop()
              }
              parent.rules.push({
                property: node.value,
                value: []
              })
              preNode = parent
              path.push(parent)
            }
            continue;
          }
          if (node.type === 'value') {
            try {
              preNode.rules[preNode.rules.length - 1].value.push(node.value);
            } catch (e) {
              console.error(preNode)
            }
            continue;
          }
          if (node.type === 'variableRef') {
            preNode.rules[preNode.rules.length - 1].value.push(vDict[node.value]);
            continue;
          }
          if (node.type === 'selector') {
            const item = {
              type: 'selector',
              value: node.value,
              indent: node.indent,
              rules: [],
              children: []
            }
            if (node.indent > preNode.indent) {
              path[path.length - 1].indent === node.indent && path.pop()
              path.push(item)
              preNode.children.push(item);
              preNode = item;
            } else {
              let parent = path.pop()
              while (node.indent <= parent.indent) {
                parent = path.pop()
              }
              parent.children.push(item)
              path.push(item)
            }
          }
        }
        return ast;
      }
      // console.log(tokenize(text1));
      // console.log(parse(tokenize(text1)));
      function transform(ast) {
          let newAst = [];
          function traverse(node, result, prefix) {
            let selector = ''
            if (node.type === 'selector') {
              selector = [...prefix, node.value];
              result.push({
                selector: selector.join(' '),
                rules: node.rules.reduce((acc, rule) => {
                  acc.push({
                    property: rule.property,
                    value: rule.value.join(' ')
                  })
                  return acc;
                }, [])
              })
            }
            for (let i = 0; i < node.children.length; i++) {
              traverse(node.children[i], result, selector)
            }
          }
          traverse(ast, newAst, [])
          return newAst;
        }