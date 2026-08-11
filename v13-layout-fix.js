// Keep previous-result labels inside the weight grid cell without changing input listeners.
function fixPreviousResultLayout(){document.querySelectorAll('.set-weight').forEach(inp=>{const note=inp.nextElementSibling;if(!note?.classList.contains('previous-result')||inp.parentElement?.classList.contains('weight-cell'))return;const cell=document.createElement('div');cell.className='weight-cell';inp.parentNode.insertBefore(cell,inp);cell.appendChild(inp);cell.appendChild(note)})}
const v13Render=render;render=function(){v13Render();fixPreviousResultLayout()};fixPreviousResultLayout();
