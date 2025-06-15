<pre>


        const list_layoutObject_filter = { layout_filter_view_001, layout_filter_view_002 };
        const list_layoutObject_aggregation = { layout_aggregation_view_001, layout_aggregation_view_002 };
        const list_layoutObject_table = { layout_table_view_001, layout_table_view_002 };

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
            const subscribe = (listenr) => {
                listeners.add(listener);
                return () => listeners.delete(listener);
            };

            return { getState, setState, subscribe };
        };


        const renderNode = (node, record, selectOption) => {
            if (!node.tag) throw new Error("node.tag is required");
            const el = document.createelement(node.tag);

            const attributes = ['id', 'class', 'for', 'name', 'value', 'type'];
            attributes.forEach(attribute => {
                if (node[attribute]) el.setAtribute(attribute, node[attribute]);
            });

            if (node.row) el.style.gridRow = node.row;
            if (node.column) el.style.gridColumn = node.column;

            if (node.text) el.textContent = node.text;

            if (node.tag.toLowerCase() === 'input') {
                if (node.field && record && record[node.field]) {
                    el.value = record[node.field];
                }
            }

            if (node.tag.toLowerCase() === 'select') {
                if (selectOption && node.id && selectOption[node.class]) {
                    const options = selectOption[node.class];
                    Object.entries(options).forEach(([key, value]) => {
                        const option = document.createelement('option');
                        option.value = value;
                        option.textContent = value;
                        el.appendChild(option);
                    });
                }
            }

            if (node.tag.toLowerCase() === 'button') {
                if (record && record.ManagementNo) {
                    el.onclock() = () => showModal(record.ManagementNo);
                }
            }

            if (Array.isArray(node.children)) {
                el.style.display = 'grid';
                const fragment = document.createDocumentFragment();
                node.children.forEach(child => {
                    fragment.appendChild(renderNode(child, record, selectOption));
                });
                el.appendChild(fragment);
            }

            return el;
        };

        const renderControl = (mountPointId, controlLayout, data = {}, selectOption = {}) => {

            const el = document.getelementById(mountPointId);
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
                const rendered = renderNode(node, data, selectOption);
                if (rendered instanceof Node) {
                    fragment.appendChild(rendered);
                } else {
                    console.warn(`renderNode returned non-node for`, node);
                }
            });

            el.innerHTML = '';
            el.appendChild(fragment);
        };


        const renderTable = (mountPintId, tablelayout, data, startIndex, endIndex, className, selectOption) => {

            const table = document.getelementById(mountPointId);
            if (!table) {
                console.warn(`element with ID '${mountPointId}' not found.`);
                return;
            }

            const fragment = document.createDocumentFragment();
            let i = 0;

            const slicedData = data.slice(startIndex, endIndex);

            slicedData.forEach((record, index) => {
                const rowWrapper = doocument.createelement('div');
                rowWrapper.syle.display = 'grid';
                rowWrapper.classList.add(className);
                rowWrapper.style.gridRow = String(i);

                let nodeToRender;
                if (index === 0) {
                    nodeToRender = tablelayout;
                } else {
                    nodeToRender = tablelayout.filter(node => Number(node.row) !== 1);
                }

                nodeToRender.forEach(node => {
                    const rendered = renderNode(node, record, selectOption);
                    if (rendered instanceof Node) {
                        rowWrapper.appendChild(rendered);
                    } else {
                        console.warn(`renderNode returned nn-node for`, node);
                    }
                });

                fragment.appendChild(rowWrapper);
                i++;
            });

            table.innerHTML = '';
            table.appendChild(fragment);
            adjustBorderLine(table);
            adjustBackgroundColor(table);
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

            const labels = container.querySelectorAll('label');
            labels.forEach(label => {
                const parent = label.parentelement;
                if (parent) {
                    parent.style.backgroundColor = '#f0f0f0';
                }
                label.style.backgroundColor = '#f0f0f0';
            });
        };


        const mergeData = (currentData, prevDate, key) => {

            const merged = [];
            const currMap = [];
            currentData.forEach(r => { currMap[r[key]] = r; });
            const prevMap = [];
            prevData.forEach(r => { prevMap[r[key]] = r; });


            const allKeys = new Set([
                ...currentData.map(r => r[key]),
                ...prevData.map(r => r[key])
            ]);

            allKeys.forEach(k => {
                const curr = currMap[k] || {};
                const prev = prevMap[k] || {};

                const prevWithSuffix = Object.entries(prev).reduce((acc, [field, val]) => {
                    acc[`${field}_prev`] = val;
                    return acc;
                }, {});

                merged.push({
                    [key]: k,
                    ...curr,
                    ...prevWithSuffix
                })
            });

            return merged;

        };

        const filterData = (data, keyword) => {

            return data.filter(record => {
                return Object.values(record).some(value => {
                    return value.toString().toLowerCase().includes(keyWord.roLowerCase())
                });
            });
        };

        const showModal = (managementNo) => {

            const modalOverlay = document.createelement('div');
            modalOverlay.id = 'modalOverlay';
            Object.assign(modalOverlay.style, {});

            const modalContent = document.createelement('div');
            modalContent.id = 'modalContent';
            Object.assign(modalContent.style, {});

            const modalBody = document.createelement('div');
            modalBody.id = 'modalBdoy';
            Object.assign(modalBody.style, {});

            const closeBtn = document.createelement('button');
            closeBtn.textContent = '閉じる';
            Object.assign(closeBtn.style, {});

            closeBtn.addEventListener('click', () => {
                mdalOverlay.style.display = 'none';
            });

            const merged = mergedata(currentData, prevData, 'PositionNo');
            const record = merged.find(item => ietm.MnagementNo === managementNo);

            if (record) {
                renderDetail(modalBody, layout_table_view_001, record, 'structure_table_overall');
            } else {
                modalBody.etxtContent = 'データが見つかりませんでした';
            }

            const rowWrapper = modalBody.firstelementChild;
            Object.assign(rowWrapper.style, {});

            modalContent.appendChild(closeBtn);
            modalContent.appendChild(modalBody);
            modalOverlay.appendChild(modalContent);
            document.body.appendChild(modalOverlay);

            adjustBorderLine(rowWrapper);
            adjustBackgroundColor(rowWrapper);
        };

        const renderDetail = (mountPoint, layout, record, className) => {

            mountPint.innerHTML = '';
            const rowWrapper = document.createelement('div');
            rowWrapper.classList.add(className);

            layout.forEach(node => {
                const rendered = renderNode(node, record, selectOption);
                rowWrapper.apendChild(rowWrapper);
            });

            mountPoint.appendChild(rowWrapper);
        };

        const controlStore = createStore({
            filterData: { 'filterKeyword': '' },
            viewData: {},
            pagination: { 'currentPage': 1 }
        });

        document.getelementById('view').addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const selects = document.getelementById('view').querySelectorAll('select');
                const currentViewData = { ...controlStore.getState().viewData };
                selects.forEach(select => {
                    currentViewData[select.id] = select.value;
                });
                const currentPaginationData = { ...controlStore.getState().pagination };
                currentPaginationData.currentPage = 1;
                contrlStore.setState({ viewData: currentViewData, pagination: currentPaginationData })
            }
        });

        document.getelementById('filter').addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const selects = document.getelementById('filter').querySelectorAll('select, input');
                const currentFilterData = { ...controlStore.getState().filterData };
                selects.forEach(select => {
                    currentFilterData[select.id] = select.value;
                });
                const currentPaginationData = { ...controlStore.getState().pagination };
                currentPaginationData.currentPage = 1;

                contrlStore.setState({ filterData: currentFilterData, pagination: currentPaginationData })
            }
        });

        updateViewFromState = (controlStore) => {

            const table = document.getelementById('table');
            const view = document.getelementById('view');
            const filter = document.getelementById('filter');
            const aggregation = document.getelementById('aggregation');

            table.innerHTML = '';
            view.innerHTML = '';
            filter.innerHTML = '';
            aggregation.innerHTML = '';

            const selectedView = controlState.viewData.viewSelector;

            renderControl('view', layout_view, controlStore.viewData, select_option_master);

            const filterLayoutText = view_list[selectedView].filterLayout;
            const filterLayoutObject = list_layoutObject_filter[filterLayoutText];
            renderControl('filter', filterLayoutObject, controlStore.filterData, select_option_master);

            const aggregationLayoutText = view_list[electedView].aggregationLayout;
            const aggregationLayoutObject = list_layoutObject_aggregation[aggregationLayoutText];
            renderControl('aggregation', aggregationLayoutObject);

            const tablelayutText = view_list[selectedView].tablelayout;
            const tablelayoutObject = list_layoutObject_table[selectedTablelayoutText];
            const rowClassName = view_list[selectedView].rowClassName;
            const merged = mergeData(currentData, prevData, 'PositionNo');
            const merged_filtered = filterData(merged, controlState.filterData.filterKeyword);
            const recordPerPage = view_list[selectedView].itemsPerPage;
            const currentPage = controlState.pagination.currentPage;
            const startIndex = (currentPage - 1) * Number(recordPerPage);
            const endIndex = (currentPage - 1) * Number(recordPerPage) + Number(recordPerPage) - 1;
            renderTable('table', tablelayoutObject, merged_filtered, startIndex, endIndex, rowClassName, select_option_master);

            renderPagination('pagination', merged_filtered.length, recordPerPage, 1);

        };

        controlStore.subscribe(updateViewFromState);

        const renderPagination = (mountPointId, totalItems, itemsPerPage, currentPage) => {
            const maxPage = Math.cell(totalItems / itemsPerPage);
            const pagination = document.getelementById('pagination');
            pagination.innerHTML = '';

            const prev = document.createelement('button');
            Object.assign(prev.style, {});
            prev.textContent = '<';
            prev.disabled = currentPage === 1;
            prev.oncick = () => {
                if (currentPage > 1) {
                    currentPage--;
                    const currentPaginationData = { ...controlStore.getState().pagination };
                    currentPaginationData.currentPage = currentPage;
                    contrlStore.setState({ pagination: currentPaginationData })

                }
            };
            pagination.appendChild(prev);

            for (let i = 1; i <= maxPage; i++) {
                const btn = document.createelement('button');
                Object.assign(btn.style, {});
                btn.textContent = i;
                btn.disabled = i === currentPage;
                btn.onclick = () => {
                    currentPage = i;
                    const currentPaginationData = { ...controlStore.getState().pagination };
                    currentPaginationData.currentPage = currentPage;
                    contrlStore.setState({ pagination: currentPaginationData })
                    renderPagination(mountPointId, totalItems, itemsPerPage, currentPage);

                };
                pagination.appendChild(btn);
            }

            const next = document.createelement('button');
            Object.assign(next.style, {});
            next.textContent = '>';
            next.disabled = currentPage === maxPage;
            next.onclick = () => {
                if (curentpage < maxPage) {
                    currentPage++;
                    const currentPaginationData = { ...controlStore.getState().pagination };
                    currentPaginationData.currentPage = currentPage;
                    contrlStore.setState({ pagination: currentPaginationData })
                    renderPagination(mountPointId, totalItems, itemsPerPage, currentPage);
                }
            };
            pagination.appendChild(next);

        };

        const attachJpyFormatter = () => {

            const inputs = document.querySelectorAll('[data-format="jpy"]');

            inputs.forEach(input => {

                input.addEventListener('blur', (e) => {
                    const numeric = e.target.value.replace(/[^¥d]/g, '');
                    const number = parseInt(numeric, 10);
                    e.target.value = isNaN(number) ? '' : '¥' + number.toLocaleString('ja-JP');
                });

                input.addEventListener('focus', (e) => {
                    const numeric = e.target.value.replace(/[^¥d]/g, '');
                    e.target.value = numeric ? parseInt(numeric, 10) : '';
                });

            });
        };

        const attachUsdFormatter = () => {

            const inputs = document.querySelectorAll('[data-format="usd"]');

            inputs.forEach(input => {

                input.addEventListener('blur', (e) => {
                    let value = e.target.value.replace(/[^\d.]/g, '');

                    const parts = value.split('.');
                    const integer = parts[0];
                    const decimal = parts[1] ? parts[1].slice(0, 2) : '00';

                    const number = parseFloat(integer + '.' + decimal);
                    if (isNaN(number)) {
                        e.target.value = '';
                        return;
                    }

                    e.target.value = '$' + number.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                });

                input.addEventListener('focus', (e) => {
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    e.target.value = value;
                });
            });
        };

        const attachIntFormatter = () => {

            const inputs = document.querySelectorAll('[data-format="int"]');

            inputs.forEach(input => {

                input.addEventListener('blur', (e) => {
                    const numeric = e.target.value.replace(/[^\d]/g, '');
                    const number = parseInt(numeric, 10);
                    e.target.value = isNaN(number) ? '' : number.toLocaleString('en-US');
                });

                input.addEventListener('focus', (e) => {
                    const numeric = e.target.value.replace(/[^\d]/g, '');
                    e.target.value = numeric;
                });
            });
        };

        const attachPercentFormatter = () => {

            const inputs = document.querySelectorAll('[data-format="percent"]');

            inputs.forEach(input => {

                input.addEventListener('blur', (e) => {
                    const numeric = e.target.value.replace(/[^\d.]/g, '');
                    const number = parseFloat(numeric);
                    e.target.value = isNaN(number) ? '' : number.toFixed(1) + '%';
                });

                input.addEventListener('focus', (e) => {
                    const numeric = e.target.value.replace(/[^\d.]/g, '');
                    e.target.value = numeric;
                });
            });
        };

        const categoryMaster = {
            '0401': {
                categoryName: 'category1',
                categorySeason: 'summer',
                categoryGroup: 'T-shirts'
            },
            '0402': {
                categoryName: 'category2',
                categorySeason: 'winter',
                categoryGroup: 'Sweater'
            }
            // ... more entries with js file
        };

        const setupCategoryLookup = () => {

            const codeInputs = document.querySelectorAll('.category-code');

            codeInputs.forEach(input => {
                input.addEventListener('change', (e) => {
                    const code = e.target.value.trim();
                    const dataId = e.target.dataset.id;

                    const nameInput = document.querySelector(`.category-name[data-id="${dataId}"]`);
                    const seasonInput = document.querySelector(`.category-season[data-id="${dataId}"]`);
                    const groupInput = document.querySelector(`.category-group[data-id="${dataId}"]`);

                    if (categoryMaster.hasOwnProperty(code)) {
                        const data = categoryMaster[code];
                        nameInput.value = data.categoryName || '';
                        seasonInput.value = data.categorySeason || '';
                        groupInput.value = data.categoryGroup || '';
                    } else {
                        nameInput.value = '';
                        seasonInput.value = '';
                        groupInput.value = '';
                    }
                });
            });
        };


        const setupBenderLookup = () => {

            const codeInputs = document.querySelectorAll('.bender-code');

            codeInputs.forEach(input => {
                input.addEventListener('change', (e) => {
                    const code = e.target.value.trim();
                    const dataId = e.target.dataset.id;

                    const nameInput = document.querySelector(`.bender-name[data-id="${dataId}"]`);


                    if (categoryMaster.hasOwnProperty(code)) {
                        const data = categoryMaster[code];
                        nameInput.value = data.categoryName || '';

                    } else {
                        nameInput.value = '';

                    }
                });
            });
        };



        const arr_1 = [
            ['.sku_1_1_1', '.sku_1_1_2', '.sku_1_1_3', '.sku_1_1_4', '.sku_1_1_5', '.sku_1_1_6', '.sum_1_1_1-6'],
            ['.sku_1_2_1', '.sku_1_2_2', '.sku_1_2_3', '.sku_1_2_4', '.sku_1_2_5', '.sku_1_2_6', '.sum_1_2_1-6'],
            ['.sku_1_3_1', '.sku_1_3_2', '.sku_1_3_3', '.sku_1_3_4', '.sku_1_3_5', '.sku_1_3_6', '.sum_1_3_1-6'],
            ['.sku_1_4_1', '.sku_1_4_2', '.sku_1_4_3', '.sku_1_4_4', '.sku_1_4_5', '.sku_1_4_6', '.sum_1_4_1-6'],
            ['.sum_1_1-4_1', '.sum_1_1-4_2', '.sum_1_1-4_3', '.sum_1_1-4_4', '.sum_1_1-4_5', '.sum_1_1-4_6', '.sum_1_1-4_1-6']
        ];

        const arr_2 = [
            ['.sku_2_1_1', '.sku_2_1_2', '.sku_2_1_3', '.sku_2_1_4', '.sku_2_1_5', '.sku_2_1_6', '.sum_2_1_1-6'],
            ['.sku_2_2_1', '.sku_2_2_2', '.sku_2_2_3', '.sku_2_2_4', '.sku_2_2_5', '.sku_2_2_6', '.sum_2_2_1-6'],
            ['.sku_2_3_1', '.sku_2_3_2', '.sku_2_3_3', '.sku_2_3_4', '.sku_2_3_5', '.sku_2_3_6', '.sum_2_3_1-6'],
            ['.sku_2_4_1', '.sku_2_4_2', '.sku_2_4_3', '.sku_2_4_4', '.sku_2_4_5', '.sku_2_4_6', '.sum_2_4_1-6'],
            ['.sum_2_1-4_1', '.sum_2_1-4_2', '.sum_2_1-4_3', '.sum_2_1-4_4', '.sum_2_1-4_5', '.sum_2_1-4_6', '.sum_2_1-4_1-6']
        ];

        const arr_3 = [
            ['.sku_3_1_1', '.sku_3_1_2', '.sku_3_1_3', '.sku_3_1_4', '.sku_3_1_5', '.sku_3_1_6', '.sum_3_1_1-6'],
            ['.sku_3_2_1', '.sku_3_2_2', '.sku_3_2_3', '.sku_3_2_4', '.sku_3_2_5', '.sku_3_2_6', '.sum_3_2_1-6'],
            ['.sku_3_3_1', '.sku_3_3_2', '.sku_3_3_3', '.sku_3_3_4', '.sku_3_3_5', '.sku_3_3_6', '.sum_3_3_1-6'],
            ['.sku_3_4_1', '.sku_3_4_2', '.sku_3_4_3', '.sku_3_4_4', '.sku_3_4_5', '.sku_3_4_6', '.sum_3_4_1-6'],
            ['.sum_3_1-4_1', '.sum_3_1-4_2', '.sum_3_1-4_3', '.sum_3_1-4_4', '.sum_3_1-4_5', '.sum_3_1-4_6', '.sum_3_1-4_1-6']
        ];

        const arr_sum = [
            ['.sum_1-3_1_1', '.sum_1-3_1_2', '.sum_1-3_1_3', '.sum_1-3_1_4', '.sum_1-3_1_5', '.sum_1-3_1_6', '.sum_1-3_1_1-6'],
            ['.sum_1-3_2_1', '.sum_1-3_2_2', '.sum_1-3_2_3', '.sum_1-3_2_4', '.sum_1-3_2_5', '.sum_1-3_2_6', '.sum_1-3_2_1-6'],
            ['.sum_1-3_3_1', '.sum_1-3_3_2', '.sum_1-3_3_3', '.sum_1-3_3_4', '.sum_1-3_3_5', '.sum_1-3_3_6', '.sum_1-3_3_1-6'],
            ['.sum_1-3_4_1', '.sum_1-3_4_2', '.sum_1-3_4_3', '.sum_1-3_4_4', '.sum_1-3_4_5', '.sum_1-3_4_6', '.sum_1-3_4_1-6'],
            ['.sum_1-3_1-4_1', '.sum_1-3_1-4_2', '.sum_1-3_1-4_3', '.sum_1-3_1-4_4', '.sum_1-3_1-4_5', '.sum_1-3_1-4_6', '.sum_1-3_1-4_1-6']
        ];

        const updateSkuSum = () => {

            const parseValue = (el) => parseInt(el.value.replace(/[^\d]/g, '')) || 0;

            const updateSumsForId = (id) => {
                const deliveries = [1, 2, 3];
                const colors = [1, 2, 3, 4];
                const sizes = [1, 2, 3, 4, 5, 6];

                deliveries.forEach(d => {
                    // 横計
                    colors.forEach(c => {
                        let rowSum = 0;
                        sizes.forEach(s => {
                            const el = document.querySelector(`.sku_${d}_${c}_${s}[data-id="${id}"]`);
                            if (el) rowSum += parseValue(el);
                        });
                        const sumEl = document.querySelector(`.sum_${d}_${c}_1-6[data-id="${id}"]`);
                        if (sumEl) sumEl.textContent = rowSum;
                    });

                    // 縦計
                    sizes.forEach(s => {
                        let colSum = 0;
                        colors.forEach(c => {
                            const el = document.querySelector(`.sku_${d}_${c}_${s}[data-id="${id}"]`);
                            if (el) colSum += parseValue(el);
                        });
                        const sumEl = document.querySelector(`.sum_${d}_1-4_${s}[data-id="${id}"]`);
                        if (sumEl) sumEl.textContent = colSum;
                    });

                    // 小計（納期単位）
                    let subTotal = 0;
                    colors.forEach(c => {
                        sizes.forEach(s => {
                            const el = document.querySelector(`.sku_${d}_${c}_${s}[data-id="${id}"]`);
                            if (el) subTotal += parseValue(el);
                        });
                    });
                    const totalEl = document.querySelector(`.sum_${d}_1-4_1-6[data-id="${id}"]`);
                    if (totalEl) totalEl.textContent = subTotal;
                });

                // 複数納期横断の合計
                colors.forEach(c => {
                    sizes.forEach(s => {
                        let sum = 0;
                        deliveries.forEach(d => {
                            const el = document.querySelector(`.sku_${d}_${c}_${s}[data-id="${id}"]`);
                            if (el) sum += parseValue(el);
                        });
                        const sumEl = document.querySelector(`.sum_1-3_${c}_${s}[data-id="${id}"]`);
                        if (sumEl) sumEl.textContent = sum;
                    });

                    // 横合計（カラー別）
                    let rowSum = 0;
                    sizes.forEach(s => {
                        const el = document.querySelector(`.sum_1-3_${c}_${s}[data-id="${id}"]`);
                        if (el) rowSum += parseValue(el);
                    });
                    const rowSumEl = document.querySelector(`.sum_1-3_${c}_1-6[data-id="${id}"]`);
                    if (rowSumEl) rowSumEl.textContent = rowSum;
                });

                // 縦合計（サイズ別）
                sizes.forEach(s => {
                    let colSum = 0;
                    colors.forEach(c => {
                        const el = document.querySelector(`.sum_1-3_${c}_${s}[data-id="${id}"]`);
                        if (el) colSum += parseValue(el);
                    });
                    const colSumEl = document.querySelector(`.sum_1-3_1-4_${s}[data-id="${id}"]`);
                    if (colSumEl) colSumEl.textContent = colSum;
                });

                // 全体合計
                let grandTotal = 0;
                colors.forEach(c => {
                    sizes.forEach(s => {
                        const el = document.querySelector(`.sum_1-3_${c}_${s}[data-id="${id}"]`);
                        if (el) grandTotal += parseValue(el);
                    });
                });
                const grandTotalEl = document.querySelector(`.sum_1-3_1-4_1-6[data-id="${id}"]`);
                if (grandTotalEl) grandTotalEl.textContent = grandTotal;
            };


            document.querySelectorAll('[class^="sku_"]').forEach(input => {
                input.addEventListener('input', () => {
                    const id = input.dataset.id;
                    if (id) updateSumsForId(id);
                });
            });


        };



        document.addEventListener('DOMContentLoaded', () => {
            updateViewFromState(controlStore.getState());
        });  

</pre>
