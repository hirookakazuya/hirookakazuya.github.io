<pre>
const createStore = (initialState) => {
  let state = { ...initialState };
  const listeners = new Set();

  const getState = () => ({ ...state });

  const setState = (partial) => {
    state = { ...state, ...partial };
    listeners.forEach(listener => {
      listener(getState());
    });
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getState, setState, subscribe };
};

const renderNode = (node, record) => {
  if (!node.tag) throw new Error("node.tag is required");
  const el = document.createElement(node.tag);

  const attributes = ['id', 'class', 'for', 'name', 'value', 'type'];
  attributes.forEach(attribute => {
    if (node[attribute]) el.setAttribute(attribute, node[attribute]);
  });

  if (node.field && record && record[node.field]) {
    el.setAttribute('value', record[node.field]);
  }

  if (node.row) el.style.gridRow = node.row;
  if (node.column) el.style.gridColumn = node.column;

  if (node.text) el.textContent = node.text;

  if (node.tag.toLowerCase() === 'button') {
    if (record && record.ManagementNo) {
      el.onclick = () => renderDetail(record.ManagementNo);
    }
  }

  if (Array.isArray(node.children)) {
    el.style.display = 'grid';
    node.children.forEach(child => {
      el.appendChild(renderNode(child, record));
    });
  }

  return el;
};

const renderControl = (mountPointId, controlLayout) => {
    const el = document.getElementById(mountPointId);
    if (!el) {
        console.warn(`Mount point '${mountPointId}' not found.`);
        return;
    }

    if (!Array.isArray(controlLayout)) {
        console.warn(`Invalid control layout:`, controlLayout);
        return;
    }

    const fragment = document.createDocumentFragment();

    controlLayout.forEach(node => {
        const rendered = renderNode(node);
        if (rendered instanceof Node) {
            fragment.appendChild(rendered);
        } else {
            console.warn(`renderNode returned non-node for`, node);
        }
    });

    el.innerHTML = '';
    el.appendChild(fragment);
};

const renderTable = (mountPointId, tableLayout, data, startIndex, endIndex, className) => {
    const table = document.getElementById(mountPointId);
    if (!table) {
        console.warn(`Element with ID '${mountPointId}' not found.`);
        return;
    }

    const fragment = document.createDocumentFragment();
    let i = 1;

    const slicedData = data.slice(startIndex, endIndex);

    slicedData.forEach((record, index) => {
        const rowWrapper = document.createElement('div');
        rowWrapper.style.display = 'grid';
        rowWrapper.classList.add(className);
        rowWrapper.style.gridRow = String(i);

        let nodeToRender;
        if (index === 0) {
            nodeToRender = tableLayout;
        } else {
            nodeToRender = tableLayout.filter(node => Number(node.row) !== 1);
        }

        nodeToRender.forEach(node => {
            const rendered = renderNode(node, record);
            if (rendered instanceof Node) {
                rowWrapper.appendChild(rendered);
            } else {
                console.warn(`renderNode returned non-node for`, node);
            }
        });

        fragment.appendChild(rowWrapper);
        i++;
    });

    table.innerHTML = '';
    table.appendChild(fragment);
    adjustBorderLine(table);
};

const adjustBorderLine = (container) => {
  const cells = Array.from(container.children);

  let maxRow = 1;
  let maxColumn = 1;

  const cellPositions = cells.map(cell => {
    const row = parseInt(cell.style.gridRow || '1', 10);
    const column = parseInt(cell.style.gridColumn || '1', 10);

    if (row > maxRow) maxRow = row;
    if (column > maxColumn) maxColumn = column;

    return { cell, row, column };
  });

  cellPositions.forEach(({ cell, row, column }) => {
    cell.style.borderRight = '1px solid #ccc';
    cell.style.borderBottom = '1px solid #ccc';

    if (row === maxRow) {
      cell.style.borderBottom = 'none';
    }
    if (column === maxColumn) {
      cell.style.borderRight = 'none';
    }
  });

  Array.from(container.children).forEach(child => {
    if (child.style.display === 'grid') {
      adjustBorderLine(child);
    }
  });
};

const adjustBackgroundColor = (container) => {
  const cells = Array.from(container.children);
  cells.forEach(cell => {
    const firstElem = cell.firstElementChild;
    if (firstElem && firstElem.tagName === 'LABEL') {
      cell.style.backgroundColor = '#858585';
    }
  });
};

const mergeData = (currentData, prevData, key ) => {
  const merged = [];
  const currMap = {};
  currentData.forEach( r => { currMap[r[key]] = r;});
  const prevMap = {};
  prevData.forEach( r => { prevMap[r[key]] = r;});

  const allKeys = new Set([
    ...currentData.map(r => r[key]),
    ...prevData.map( r => r[key])
  ]);


  allKeys.forEach(k =>{
    const curr = currMap[k]||{};
    const prev = prevMap[k]||{};
  
    const prevWithSuffix = Object.entries(prev).reduce((acc,[field,val]) => {
      acc['${field}_prev'] = val;
      return acc;
    },{});
  
    merged.push({
      [key]:k,
      ...curr,
      ...prevWithSuffix
    });
  
　　});

  return merged;

};

const filterData = ( data, keyWord ) => {
  return data.filter( record => {
    return Object.values(record).some( value => {
      return value.toString().toLowerCase().includes(keyWord.toLowerCase());
    });
  });
};

const showModal = (recordId) => {
  const modalOverlay = document.createElement('div');
  const modalBody = document.createElement('div');
  const modalContent = document.createElement('div');
  const closeButton = document.createElement('button');

  document.body.appendChild(modalOverlay);
  modalOverlay.appendChild(modalContent);
  modalBody.appendChild(modalBody);
  modalBody.appendChild(closeButton);

  Object.assign(modalOverlay.style, {});
  Object.assign(modalBody.style, {});
  Object.assign(modalContent.style, {});
  Object.assign(closeButton.style, {});

  closeButton.textContent = '閉じる';
  closeButton.addEventListener('click', () => {
    modalOverlay.remove();
  });

  const mergedData = mergeData(currentData, prevData, key);
  const targetRecord = mergedData.find(record => record.ManagementNo === recordId);

  if (targetRecord) {
    renderDetail(modalBody, detailLayout, targetRecord);
    adjustBorderLine(modalBody);
  } else {
    modalBody.textContent = '対象のレコードがありません';
  }
};

const renderPagination = ( mountPointId, controlState ) => {

  const totalItems = controlStore.getState().totalItems;
  const itemsPerPage = controlStore.getState().itemsPerPage;
  const currentPage = controlStore.getState().currentPage;
  
  const maxPage = Math.ceil(totalItems / itemsPerPage);
  
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  const prev = document.createElement('button');
  prev.textContent = '前へ';
  prev.disabled = currentPage === 1;
  prev.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      updateTable();
      renderPagination(data.length);
    }
  };
  pagination.appendChild(prev);

  for (let i = 1; i <= maxPage; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.disabled = i === currentPage;
    btn.onclick = () => {
      currentPage = i;
      updateTable();
      renderPagination(data.length);
    };
    pagination.appendChild(btn);
  }

  const next = document.createElement('button');
  next.textContent = '次へ';
  next.disabled = currentPage === maxPage;
  next.onclick = () => {
    if (currentPage < maxPage) {
      currentPage++;
      updateTable();
      renderPagination(data.length);
    }
  };
  pagination.appendChild(next);
}

</pre>
