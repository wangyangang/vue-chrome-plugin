// �����ļ�

const filesInDirectory = dir =>
  new Promise(resolve =>
    dir.createReader().readEntries(entries => {
      Promise.all(
          entries
          .filter(e => e.name[0] !== '.')
          .map(e =>
            e.isDirectory ? filesInDirectory(e) : new Promise(resolve => e.file(resolve))
          )
        )
        .then(files => [].concat(...files))
        .then(resolve);
    })
  );

// �������Ŀ¼����ȡ�ļ���Ϣ������ļ����ƺ��޸�ʱ�������
const timestampForFilesInDirectory = dir =>
  filesInDirectory(dir).then(files =>
    files.map(f => f.name + f.lastModifiedDate).join()
  );

// ˢ�µ�ǰ�ҳ
const reload = () => {
  window.chrome.tabs.query({
      active: true,
      currentWindow: true
    },
    tabs => {
      // NB: see https://github.com/xpl/crx-hotreload/issues/5
      if (tabs[0]) {
        window.chrome.tabs.reload(tabs[0].id);
      }
      // ǿ��ˢ��ҳ��
      window.chrome.runtime.reload();
    }
  );
};

// �۲��ļ��Ķ�
const watchChanges = (dir, lastTimestamp) => {
  timestampForFilesInDirectory(dir).then(timestamp => {
    // �ļ�û�иĶ���ѭ������watchChanges����
    if (!lastTimestamp || lastTimestamp === timestamp) {
      setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
    } else {
      // ǿ��ˢ��ҳ��
      reload();
    }
  });
};

const hotReload = () => {
  window.chrome.management.getSelf(self => {
    if (self.installType === 'development') {
      // ��ȡ���Ŀ¼�������ļ��仯
      window.chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir));
    }
  });
};

export default hotReload;
