(() => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const gamePanel = document.querySelector(".game-panel");
  const restartBtn = document.getElementById("restartBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const leaderboardBtn = document.getElementById("leaderboardBtn");
  const settingsBtn = document.getElementById("settingsBtn");
  const helpBtn = document.getElementById("helpBtn");
  const scoreValue = document.getElementById("scoreValue");
  const bestValue = document.getElementById("bestValue");
  const timerValue = document.getElementById("timerValue");
  const nextBlob = document.getElementById("nextBlob");
  const nextName = document.getElementById("nextName");
  const nextHint = document.getElementById("nextHint");
  const coachStage = document.getElementById("coachStage");
  const coachTitle = document.getElementById("coachTitle");
  const coachTip = document.getElementById("coachTip");
  const objectiveStage = document.getElementById("objectiveStage");
  const objectiveTitle = document.getElementById("objectiveTitle");
  const objectiveFill = document.getElementById("objectiveFill");
  const objectiveValue = document.getElementById("objectiveValue");
  const objectiveTip = document.getElementById("objectiveTip");
  const statusBanner = document.getElementById("statusBanner");
  const dangerMeter = document.getElementById("dangerMeter");
  const dangerText = document.getElementById("dangerText");
  const dangerFill = document.getElementById("dangerFill");
  const startPanel = document.getElementById("startPanel");
  const startGameBtn = document.getElementById("startGameBtn");
  const startHelpBtn = document.getElementById("startHelpBtn");
  const pausePanel = document.getElementById("pausePanel");
  const resumeGameBtn = document.getElementById("resumeGameBtn");
  const pauseRestartBtn = document.getElementById("pauseRestartBtn");
  const pauseHelpBtn = document.getElementById("pauseHelpBtn");
  const pauseObjectiveStage = document.getElementById("pauseObjectiveStage");
  const pauseObjectiveTitle = document.getElementById("pauseObjectiveTitle");
  const pauseObjectiveFill = document.getElementById("pauseObjectiveFill");
  const pauseObjectiveValue = document.getElementById("pauseObjectiveValue");
  const pauseObjectiveTip = document.getElementById("pauseObjectiveTip");
  const resultPanel = document.getElementById("resultPanel");
  const resultTitle = document.getElementById("resultTitle");
  const resultScore = document.getElementById("resultScore");
  const resultBest = document.getElementById("resultBest");
  const resultTier = document.getElementById("resultTier");
  const resultDuration = document.getElementById("resultDuration");
  const resultMerges = document.getElementById("resultMerges");
  const resultDangerPeak = document.getElementById("resultDangerPeak");
  const resultReviewTitle = document.getElementById("resultReviewTitle");
  const resultReviewTip = document.getElementById("resultReviewTip");
  const resultReviewTags = document.getElementById("resultReviewTags");
  const resultObjectiveStage = document.getElementById("resultObjectiveStage");
  const resultObjectiveTitle = document.getElementById("resultObjectiveTitle");
  const resultObjectiveValue = document.getElementById("resultObjectiveValue");
  const resultObjectiveTip = document.getElementById("resultObjectiveTip");
  const resultMilestones = document.getElementById("resultMilestones");
  const resultRestartBtn = document.getElementById("resultRestartBtn");
  const leaderboardPanel = document.getElementById("leaderboardPanel");
  const leaderboardList = document.getElementById("leaderboardList");
  const leaderboardCloseBtn = document.getElementById("leaderboardCloseBtn");
  const historyAvgDuration = document.getElementById("historyAvgDuration");
  const historyAvgMerges = document.getElementById("historyAvgMerges");
  const historyAvgDanger = document.getElementById("historyAvgDanger");
  const historyCommonFailure = document.getElementById("historyCommonFailure");
  const progressTotalRuns = document.getElementById("progressTotalRuns");
  const progressTotalScore = document.getElementById("progressTotalScore");
  const progressTotalMerges = document.getElementById("progressTotalMerges");
  const progressBestTier = document.getElementById("progressBestTier");
  const progressLongestRun = document.getElementById("progressLongestRun");
  const progressMilestones = document.getElementById("progressMilestones");
  const progressAchievementList = document.getElementById("progressAchievementList");
  const startGuideList = document.getElementById("startGuideList");
  const analyticsGuideProgress = document.getElementById("analyticsGuideProgress");
  const analyticsDropBias = document.getElementById("analyticsDropBias");
  const analyticsRecovery = document.getElementById("analyticsRecovery");
  const analyticsPressure = document.getElementById("analyticsPressure");
  const analyticsTaskRate = document.getElementById("analyticsTaskRate");
  const helpPanel = document.getElementById("helpPanel");
  const helpCloseBtn = document.getElementById("helpCloseBtn");
  const settingsPanel = document.getElementById("settingsPanel");
  const settingsCloseBtn = document.getElementById("settingsCloseBtn");
  const audioToggle = document.getElementById("audioToggle");
  const shakeToggle = document.getElementById("shakeToggle");
  const volumeRange = document.getElementById("volumeRange");
  const clearLeaderboardBtn = document.getElementById("clearLeaderboardBtn");
  const resetProgressBtn = document.getElementById("resetProgressBtn");
  const resetAllDataBtn = document.getElementById("resetAllDataBtn");
  const undoImportBtn = document.getElementById("undoImportBtn");
  const createSnapshotBtn = document.getElementById("createSnapshotBtn");
  const exportDataBtn = document.getElementById("exportDataBtn");
  const importDataInput = document.getElementById("importDataInput");
  const exportNoteInput = document.getElementById("exportNoteInput");
  const backupNameInput = document.getElementById("backupNameInput");
  const backupGroupInput = document.getElementById("backupGroupInput");
  const backupNoteInput = document.getElementById("backupNoteInput");
  const backupTagInput = document.getElementById("backupTagInput");
  const exportIncludeLeaderboard = document.getElementById("exportIncludeLeaderboard");
  const exportIncludeProgress = document.getElementById("exportIncludeProgress");
  const exportIncludeOnboarding = document.getElementById("exportIncludeOnboarding");
  const exportIncludeBest = document.getElementById("exportIncludeBest");
  const exportIncludeSettings = document.getElementById("exportIncludeSettings");
  const importIncludeLeaderboard = document.getElementById("importIncludeLeaderboard");
  const importMergeLeaderboard = document.getElementById("importMergeLeaderboard");
  const importIncludeProgress = document.getElementById("importIncludeProgress");
  const importMergeProgress = document.getElementById("importMergeProgress");
  const importIncludeOnboarding = document.getElementById("importIncludeOnboarding");
  const importMergeOnboarding = document.getElementById("importMergeOnboarding");
  const importIncludeBest = document.getElementById("importIncludeBest");
  const importIncludeSettings = document.getElementById("importIncludeSettings");
  const importBackupHistory = document.getElementById("importBackupHistory");
  const importPreviewBox = document.getElementById("importPreviewBox");
  const clearBackupHistoryBtn = document.getElementById("clearBackupHistoryBtn");
  const backupSearchInput = document.getElementById("backupSearchInput");
  const backupSourceFilter = document.getElementById("backupSourceFilter");
  const backupPinnedFilter = document.getElementById("backupPinnedFilter");
  const backupGroupFilter = document.getElementById("backupGroupFilter");
  const backupTagFilter = document.getElementById("backupTagFilter");
  const backupSortOrder = document.getElementById("backupSortOrder");
  const backupTagSummary = document.getElementById("backupTagSummary");
  const clearTagFilterBtn = document.getElementById("clearTagFilterBtn");
  const backupStatsGrid = document.getElementById("backupStatsGrid");
  const backupCapacityHint = document.getElementById("backupCapacityHint");
  const backupTagStats = document.getElementById("backupTagStats");
  const backupPolicyPreview = document.getElementById("backupPolicyPreview");
  const backupCleanupPolicy = document.getElementById("backupCleanupPolicy");
  const applyCleanupPolicyBtn = document.getElementById("applyCleanupPolicyBtn");
  const archiveSelectedBackupsBtn = document.getElementById("archiveSelectedBackupsBtn");
  const pinSelectedBackupsBtn = document.getElementById("pinSelectedBackupsBtn");
  const unpinSelectedBackupsBtn = document.getElementById("unpinSelectedBackupsBtn");
  const exportSelectedBackupsBtn = document.getElementById("exportSelectedBackupsBtn");
  const tagSelectedBackupsBtn = document.getElementById("tagSelectedBackupsBtn");
  const renameSelectedBackupsBtn = document.getElementById("renameSelectedBackupsBtn");
  const deleteSelectedBackupsBtn = document.getElementById("deleteSelectedBackupsBtn");
  const archivedBackupHistory = document.getElementById("archivedBackupHistory");
  const archivedStatsGrid = document.getElementById("archivedStatsGrid");
  const archivedBackupSearchInput = document.getElementById("archivedBackupSearchInput");
  const clearArchivedBackupsBtn = document.getElementById("clearArchivedBackupsBtn");
  const unarchiveSelectedBackupsBtn = document.getElementById("unarchiveSelectedBackupsBtn");
  const pinSelectedArchivedBackupsBtn = document.getElementById("pinSelectedArchivedBackupsBtn");
  const unpinSelectedArchivedBackupsBtn = document.getElementById("unpinSelectedArchivedBackupsBtn");
  const operationLogList = document.getElementById("operationLogList");
  const clearOperationLogBtn = document.getElementById("clearOperationLogBtn");
  const exportRecordList = document.getElementById("exportRecordList");
  const clearExportRecordBtn = document.getElementById("clearExportRecordBtn");
  const restoreRecordList = document.getElementById("restoreRecordList");
  const exportRestoreRecordBtn = document.getElementById("exportRestoreRecordBtn");
  const exportRestoreSummaryBtn = document.getElementById("exportRestoreSummaryBtn");
  const clearRestoreRecordBtn = document.getElementById("clearRestoreRecordBtn");
  const restoreRecordSearchInput = document.getElementById("restoreRecordSearchInput");
  const restoreRecordScopeFilter = document.getElementById("restoreRecordScopeFilter");
  const restoreRecordKindFilter = document.getElementById("restoreRecordKindFilter");
  const isMobileMode =
    window.__BLOB_MOBILE_MODE__ === true ||
    new URLSearchParams(window.location.search).get("mode") === "mobile";

  const WORLD = { width: 420, height: 760 };
  const PIT = { x: 28, y: 120, width: 364, height: 592 };
  const FLOOR_Y = PIT.y + PIT.height;
  const DANGER_Y = PIT.y + 54;
  const WARNING_Y = PIT.y + 182;
  const SPAWN_Y = 78;
  const BASE_GRAVITY = 560;
  const DROP_COOLDOWN = 0.26;
  const OVERLINE_LIMIT = 14;
  const STACK_CHECK_MIN_Y = PIT.y + 36;
  const STACK_CHECK_MAX_VY = 240;
  const STORAGE_KEY = "blob-merge-prototype-best";
  const LEADERBOARD_KEY = "blob-merge-prototype-local-scores";
  const PROGRESS_KEY = "blob-merge-prototype-progress";
  const ONBOARDING_KEY = "blob-merge-prototype-onboarding";
  const IMPORT_BACKUP_KEY = "blob-merge-prototype-last-import-backup";
  const IMPORT_BACKUPS_KEY = "blob-merge-prototype-import-backups";
  const OPERATION_LOG_KEY = "blob-merge-prototype-operation-logs";
  const EXPORT_RECORD_KEY = "blob-merge-prototype-export-records";
  const RESTORE_RECORD_KEY = "blob-merge-prototype-restore-records";
  const MAX_IMPORT_BACKUPS = 5;
  const SETTINGS_KEY = "blob-merge-prototype-settings";
  const WALL_BOUNCE = 0.44;
  const FLOOR_BOUNCE = 0.34;
  const BLOB_RESTITUTION = 0.68;
  const MERGE_TOUCH_GAP = -0.8;
  const MAX_FALL_SPEED_BASE = 660;
  const STACK_SQUISH_PUSH = 58;
  const STACK_SQUISH_DOWN = 18;
  const TILT_MAX_DEG = 32;
  const TILT_ACCEL_X = 420;
  const TILT_SMOOTH = 7.5;

  const LEVELS = [
    { name: "孢子", hint: "先铺底，别急着追高阶", color: "#7ecbff", score: 2, radius: 20 },
    { name: "幼体", hint: "把小家伙们凑到一起", color: "#7fe7b1", score: 4, radius: 25 },
    { name: "弹弹体", hint: "中盘开始讲究落点了", color: "#ffd36f", score: 8, radius: 31 },
    { name: "泡泡怪", hint: "开始会挡路，得整理空间", color: "#ff9dd0", score: 16, radius: 38 },
    { name: "凝胶兽", hint: "再往上就要小心危险线", color: "#a491ff", score: 32, radius: 46 },
    { name: "触角球", hint: "大块头会把局面挤紧", color: "#64e0dc", score: 64, radius: 56 },
    { name: "巨啵体", hint: "高手区间，留空比贪分更重要", color: "#ff8f9d", score: 128, radius: 67 },
    { name: "母体球", hint: "这一颗值得一次全场播报", color: "#ffb17d", score: 256, radius: 79 },
    { name: "星核团", hint: "已经很厉害了，别手抖", color: "#ffe17b", score: 512, radius: 92 },
    { name: "宇宙团", hint: "封神局，记得截图炫耀", color: "#72d9ff", score: 1024, radius: 108 }
  ];

  const MERGE_EXPRESSIONS = [
    "pop_grin",
    "cheeky",
    "dizzy_fun",
    "big_smirk",
    "gasp_laugh",
    "spiral_joy",
    "proud_goof",
    "star_struck",
    "cosmic_laugh",
    "legend_face"
  ];

  const MILESTONE_META = {
    first_drop: {
      title: "第一投",
      description: "开局第一只已经落下，开始进入节奏。",
      requirement: "完成 1 次投放"
    },
    first_merge: {
      title: "第一次合并",
      description: "你已经完成第一次合并，玩法循环已经跑起来了。",
      requirement: "完成 1 次合并"
    },
    three_merges: {
      title: "三连合并",
      description: "累计完成 3 次合并，已经进入连锁节奏。",
      requirement: "累计完成 3 次合并"
    },
    reach_level_5: {
      title: "合出凝胶兽",
      description: "达成中盘关键节点：出现更大体型后，空间管理会更重要。",
      requirement: "合出第 5 阶段体型"
    },
    reach_level_7: {
      title: "合出巨啵体",
      description: "你已经进入高手区间，这局值得截图。",
      requirement: "合出第 7 阶段体型"
    },
    survive_60s: {
      title: "稳住 60 秒",
      description: "这局已经能把节奏稳住 1 分钟以上了。",
      requirement: "单局存活达到 60 秒"
    },
    escape_overline: {
      title: "险境脱离",
      description: "从触线倒计时里把局势拉回来了，干得漂亮。",
      requirement: "触线后成功退回安全区"
    }
  };

  const ONBOARDING_STEPS = [
    { key: "first_drop", title: "完成第一投", description: "把第一只成功投放出去，开始进入操作状态。" },
    { key: "first_merge", title: "完成第一次合并", description: "让玩法循环真正跑起来，开始理解落点节奏。" },
    { key: "first_warning", title: "第一次接近危险区", description: "体验危险条开始升高，并学会优先整理高点。" },
    { key: "first_pause", title: "打开一次暂停", description: "知道暂停里可以回看当前任务，而不是盲目继续。" },
    { key: "first_gameover", title: "完成第一局", description: "走完整个试玩闭环，能看到复盘、任务回看和里程碑。" }
  ];

  const DROP_POOL = [
    { level: 0, weight: 38 },
    { level: 1, weight: 30 },
    { level: 2, weight: 18 },
    { level: 3, weight: 10 },
    { level: 4, weight: 4 }
  ];

  const FACE_MOODS = ["o_o", "^_^", ">_<", "x_x"];
  const stars = Array.from({ length: 36 }, () => ({
    x: Math.random() * WORLD.width,
    y: Math.random() * WORLD.height,
    r: Math.random() * 1.8 + 0.4,
    a: Math.random() * 0.5 + 0.18
  }));

  const state = {
    blobs: [],
    popups: [],
    bursts: [],
    sparks: [],
    pointerX: PIT.x + PIT.width / 2,
    pointerActive: false,
    nextLevel: 0,
    score: 0,
    best: readBest(),
    started: false,
    dropCount: 0,
    mergeCount: 0,
    centerDropCount: 0,
    edgeDropCount: 0,
    firstMergeAt: 0,
    firstWarningAt: 0,
    recoveryCount: 0,
    peakWarningLevel: 0,
    maxBlobsOnBoard: 0,
    triggeredDangerCount: 0,
    warningLevel: 0,
    overlineTime: 0,
    dropCooldown: 0,
    gameOver: false,
    paused: false,
    maxLevelReached: 0,
    recordBeaten: false,
    runStartTime: 0,
    cameraPunch: 0,
    time: 0,
    accumulator: 0,
    lastTs: 0,
    keyboardDir: 0,
    idSeed: 1,
    pointerStartX: 0,
    pointerStartY: 0,
    pointerStartTime: 0,
    panelsOpen: 0,
    tutorialStage: "",
    tutorialTitle: "",
    tutorialTip: "",
    tutorialTimer: 0,
    warningHintShown: false,
    midgameHintShown: false,
    tiltTargetX: 0,
    tiltX: 0,
    motionReady: false,
    motionPermissionAsked: false,
    motionListenerAttached: false,
    milestonesUnlocked: [],
    milestoneKeys: {},
    everInOverline: false,
    failureType: "",
    taskRewardKeys: {},
    lastObjectiveSnapshot: null,
    expandedBackupIndexes: {},
    selectedBackupIndexes: {},
    selectedArchivedBackupIndexes: {},
    collapsedBackupGroups: {},
    selectedBackupTagFilters: [],
    selectedBackupPinnedFilter: "all",
    selectedBackupGroupFilter: "all",
    archivedBackupKeyword: ""
  };

  const settings = readSettings();
  let audioCtx = null;
  let bgmIntervalId = null;
  let bgmStep = 0;
  const BGM_SEQUENCE = [
    { bass: 220.0, lead: 659.25 },
    { bass: 220.0, lead: 783.99 },
    { bass: 246.94, lead: 880.0 },
    { bass: 246.94, lead: 783.99 },
    { bass: 196.0, lead: 659.25 },
    { bass: 196.0, lead: 587.33 },
    { bass: 174.61, lead: 523.25 },
    { bass: 196.0, lead: 587.33 }
  ];

  function readSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
      return {
        audioEnabled: saved.audioEnabled ?? true,
        shakeEnabled: saved.shakeEnabled ?? true,
        volume: saved.volume ?? 0.65,
        backupCleanupPolicy: saved.backupCleanupPolicy ?? "recent"
      };
    } catch {
      return { audioEnabled: true, shakeEnabled: true, volume: 0.65, backupCleanupPolicy: "recent" };
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }

  function readBest() {
    try {
      return Number(localStorage.getItem(STORAGE_KEY) || 0);
    } catch {
      return 0;
    }
  }

  function writeBest(value) {
    try {
      localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // 忽略本地存储失败
    }
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function weightedRandomLevel() {
    const openingPool =
      state.mergeCount === 0 && state.dropCount < 5
        ? [
            { level: 0, weight: 48 },
            { level: 1, weight: 34 },
            { level: 2, weight: 14 },
            { level: 3, weight: 4 }
          ]
        : DROP_POOL;
    const total = openingPool.reduce((sum, item) => sum + item.weight, 0);
    let roll = Math.random() * total;
    for (const item of openingPool) {
      roll -= item.weight;
      if (roll <= 0) {
        return item.level;
      }
    }
    return openingPool[0].level;
  }

  function readLeaderboard() {
    try {
      const saved = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
      if (!Array.isArray(saved)) return [];
      return saved.map((entry) => ({
        score: Number(entry.score || 0),
        tier: Number(entry.tier || 1),
        duration: entry.duration || "0s",
        durationSeconds: Number(entry.durationSeconds || 0),
        date: entry.date || "",
        mode: entry.mode || "",
        merges: Number(entry.merges || 0),
        peakDanger: Number(entry.peakDanger || 0),
        failureType: entry.failureType || "暂无",
        maxBlobsOnBoard: Number(entry.maxBlobsOnBoard || 0),
        triggeredDangerCount: Number(entry.triggeredDangerCount || 0)
      }));
    } catch {
      return [];
    }
  }

  function writeLeaderboard(entries) {
    try {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
    } catch {
      // ignore
    }
  }

  function readProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
      return {
        totalRuns: Number(saved.totalRuns || 0),
        totalScore: Number(saved.totalScore || 0),
        totalMerges: Number(saved.totalMerges || 0),
        bestTier: Number(saved.bestTier || 1),
        longestDurationSeconds: Number(saved.longestDurationSeconds || 0),
        unlockedMilestoneKeys:
          saved.unlockedMilestoneKeys && typeof saved.unlockedMilestoneKeys === "object"
            ? saved.unlockedMilestoneKeys
            : {}
      };
    } catch {
      return {
        totalRuns: 0,
        totalScore: 0,
        totalMerges: 0,
        bestTier: 1,
        longestDurationSeconds: 0,
        unlockedMilestoneKeys: {}
      };
    }
  }

  function writeProgress(progress) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }

  function readOnboarding() {
    try {
      const saved = JSON.parse(localStorage.getItem(ONBOARDING_KEY) || "{}");
      return typeof saved === "object" && saved ? saved : {};
    } catch {
      return {};
    }
  }

  function writeOnboarding(data) {
    try {
      localStorage.setItem(ONBOARDING_KEY, JSON.stringify(data));
    } catch {
      // ignore
    }
  }

  function countCompletedOnboarding(data) {
    return ONBOARDING_STEPS.filter((step) => Boolean(data[step.key])).length;
  }

  function completeOnboardingStep(key) {
    const data = readOnboarding();
    if (data[key]) return;
    data[key] = true;
    const completed = countCompletedOnboarding(data);
    if (completed === ONBOARDING_STEPS.length && !data.all_done) {
      data.all_done = true;
      spawnPopup(WORLD.width / 2, 118, "首次引导已完整走通！", "#fde68a");
      setCoachMoment(
        "引导完成",
        "你已经完成首次试玩闭环",
        "后面可以更专注地看任务、复盘和数据面板，不用再按新手节奏来。",
        5
      );
      playTone({ frequency: 880, duration: 0.16, type: "triangle", gain: 0.04 });
    }
    writeOnboarding(data);
    renderOnboardingChecklist();
    updateAnalyticsPanel();
  }

  function renderGuideInto(container, data) {
    if (!container) return;
    container.innerHTML = ONBOARDING_STEPS.map((step) => {
      const done = Boolean(data[step.key]);
      return `
        <div class="guide-item ${done ? "done" : "todo"}">
          <span class="guide-check">${done ? "✓" : step.key === "first_gameover" ? "5" : ONBOARDING_STEPS.findIndex((s) => s.key === step.key) + 1}</span>
          <div class="guide-copy">
            <strong>${done ? step.title : `未完成：${step.title}`}</strong>
            <small>${step.description}</small>
          </div>
        </div>
      `;
    }).join("");
  }

  function renderOnboardingChecklist() {
    const data = readOnboarding();
    renderGuideInto(startGuideList, data);
  }

  function resetOnboardingData() {
    writeOnboarding({});
    renderOnboardingChecklist();
    updateAnalyticsPanel();
  }

  function downloadJson(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 800);
  }

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 800);
  }

  function getExportSelection() {
    return {
      leaderboard: exportIncludeLeaderboard ? exportIncludeLeaderboard.checked : true,
      progress: exportIncludeProgress ? exportIncludeProgress.checked : true,
      onboarding: exportIncludeOnboarding ? exportIncludeOnboarding.checked : true,
      best: exportIncludeBest ? exportIncludeBest.checked : true,
      settings: exportIncludeSettings ? exportIncludeSettings.checked : true
    };
  }

  function getImportSelection() {
    return {
      leaderboard: importIncludeLeaderboard ? importIncludeLeaderboard.checked : true,
      mergeLeaderboard: importMergeLeaderboard ? importMergeLeaderboard.checked : false,
      progress: importIncludeProgress ? importIncludeProgress.checked : true,
      mergeProgress: importMergeProgress ? importMergeProgress.checked : false,
      onboarding: importIncludeOnboarding ? importIncludeOnboarding.checked : true,
      mergeOnboarding: importMergeOnboarding ? importMergeOnboarding.checked : false,
      best: importIncludeBest ? importIncludeBest.checked : true,
      settings: importIncludeSettings ? importIncludeSettings.checked : true
    };
  }

  function sanitizeFilePart(value) {
    if (!value) return "";
    return String(value)
      .trim()
      .replaceAll(/[\\/:*?"<>|]/g, "_")
      .replaceAll(/\s+/g, "_")
      .slice(0, 24);
  }

  function promptExportFilename(defaultBaseName) {
    const suggested = sanitizeFilePart(defaultBaseName) || "export";
    const input = window.prompt("设置导出文件名（不需要填写 .json）：", suggested);
    if (input === null) return null;
    const normalized = sanitizeFilePart(input) || suggested;
    return `${normalized}.json`;
  }

  function promptTextFilename(defaultBaseName) {
    const suggested = sanitizeFilePart(defaultBaseName) || "summary";
    const input = window.prompt("设置导出文件名（不需要填写 .txt）：", suggested);
    if (input === null) return null;
    const normalized = sanitizeFilePart(input) || suggested;
    return `${normalized}.txt`;
  }

  function getBackupNote() {
    if (!backupNoteInput) return "";
    return String(backupNoteInput.value || "").trim().slice(0, 40);
  }

  function getBackupTag() {
    if (!backupTagInput) return "";
    return normalizeBackupTagValue(backupTagInput.value || "");
  }

  function parseBackupTags(raw) {
    const text = String(raw || "").trim();
    if (!text) return [];
    const parts = text.split(/[，,;；]/g).map((value) => value.trim()).filter(Boolean);
    return [...new Set(parts)].slice(0, 5);
  }

  function formatBackupTags(tags) {
    const list = Array.isArray(tags) ? tags : [];
    return list.join("、");
  }

  function normalizeBackupTagValue(raw) {
    return parseBackupTags(raw).join(",").slice(0, 24);
  }

  function renderSelectedTagSummary() {
    if (!backupTagSummary) return;
    const selected = Array.isArray(state.selectedBackupTagFilters) ? state.selectedBackupTagFilters : [];
    if (!selected.length) {
      backupTagSummary.textContent = "已选标签：无";
      return;
    }
    const readable = selected.map((tag) => (tag === "__untagged__" ? "无标签" : tag));
    backupTagSummary.textContent = `已选标签：${readable.join("、")}`;
  }

  function buildExportPayload(selection) {
    const now = new Date();
    const sel = selection || getExportSelection();
    if (!sel.leaderboard && !sel.progress && !sel.onboarding && !sel.best && !sel.settings) {
      throw new Error("请至少选择一个导出项");
    }
    const note = exportNoteInput ? exportNoteInput.value.trim() : "";
    return {
      meta: {
        app: "blob-merge-prototype",
        version: 1,
        exportedAt: now.toISOString(),
        includes: sel,
        note
      },
      data: {
        leaderboard: sel.leaderboard ? readLeaderboard() : undefined,
        progress: sel.progress ? readProgress() : undefined,
        onboarding: sel.onboarding ? readOnboarding() : undefined,
        best: sel.best ? readBest() : undefined,
        settings: sel.settings ? settings : undefined
      }
    };
  }

  function buildImportSummary(payload) {
    const analysis = analyzeImportPayload(payload);
    const meta = analysis.meta || {};
    const data = analysis.data || {};
    const lines = [];
    lines.push(`来源：${meta.app || "未知"} v${meta.version || "?"}`);
    if (meta.exportedAt) lines.push(`导出时间：${meta.exportedAt}`);
    if (meta.includes && typeof meta.includes === "object") {
      const includeList = [
        meta.includes.leaderboard ? "排行榜" : null,
        meta.includes.progress ? "长期进度" : null,
        meta.includes.onboarding ? "引导进度" : null,
        meta.includes.best ? "最高分" : null,
        meta.includes.settings ? "设置" : null
      ]
        .filter(Boolean)
        .join("、");
      if (includeList) lines.push(`导出包含：${includeList}`);
    }

    const hasLeaderboard = analysis.has.leaderboard;
    const hasProgress = analysis.has.progress;
    const hasOnboarding = analysis.has.onboarding;
    const hasBest = analysis.has.best;
    const hasSettings = analysis.has.settings;

    lines.push(`包含：${[
      hasLeaderboard ? "排行榜" : null,
      hasProgress ? "长期进度" : null,
      hasOnboarding ? "引导进度" : null,
      hasBest ? "最高分" : null,
      hasSettings ? "设置" : null
    ]
      .filter(Boolean)
      .join("、") || "（未包含任何可识别数据）"}`);

    if (hasLeaderboard) lines.push(`排行榜条数：${data.leaderboard.length}`);
    if (hasProgress) {
      lines.push(`累计局数：${Number(data.progress.totalRuns || 0)}`);
      lines.push(`历史最高等级：${Number(data.progress.bestTier || 1)}`);
    }
    if (hasOnboarding) {
      const completed = ONBOARDING_STEPS.filter((s) => Boolean(data.onboarding[s.key])).length;
      lines.push(`引导进度：${completed}/${ONBOARDING_STEPS.length}`);
    }
    if (hasBest) lines.push(`最高分：${data.best}`);
    if (analysis.notes.length) {
      lines.push("");
      lines.push(...analysis.notes.map((note) => `提示：${note}`));
    }
    return lines.join("\n");
  }

  function normalizeProgressData(progress) {
    const source = progress && typeof progress === "object" ? progress : {};
    return {
      totalRuns: Number(source.totalRuns || source.runs || 0),
      totalScore: Number(source.totalScore || source.scoreSum || 0),
      totalMerges: Number(source.totalMerges || source.mergeSum || 0),
      bestTier: Number(source.bestTier || source.bestLevel || 1),
      longestDurationSeconds: Number(source.longestDurationSeconds || source.longestDuration || 0),
      unlockedMilestoneKeys:
        source.unlockedMilestoneKeys && typeof source.unlockedMilestoneKeys === "object"
          ? source.unlockedMilestoneKeys
          : source.unlockedMilestones && typeof source.unlockedMilestones === "object"
            ? source.unlockedMilestones
            : {}
    };
  }

  function normalizeSettingsData(source) {
    const settingsData = source && typeof source === "object" ? source : {};
    return {
      audioEnabled: settingsData.audioEnabled ?? settingsData.audio ?? true,
      shakeEnabled: settingsData.shakeEnabled ?? settingsData.shake ?? true,
      volume: clamp(Number(settingsData.volume ?? 0.65), 0, 1)
    };
  }

  function normalizeImportPayload(payload) {
    if (!payload || typeof payload !== "object") {
      throw new Error("文件内容不是有效对象");
    }
    const hasWrappedData = payload.data && typeof payload.data === "object";
    const looksLegacyRoot =
      Array.isArray(payload.leaderboard) ||
      typeof payload.progress === "object" ||
      typeof payload.onboarding === "object" ||
      typeof payload.best === "number" ||
      typeof payload.best === "string" ||
      typeof payload.settings === "object";
    const data = hasWrappedData ? payload.data : looksLegacyRoot ? payload : {};
    const meta = payload.meta && typeof payload.meta === "object" ? payload.meta : {};
    return { meta, data };
  }

  function analyzeImportPayload(payload) {
    const { meta, data } = normalizeImportPayload(payload);
    const notes = [];

    const hasWrappedData = payload && typeof payload === "object" && payload.data && typeof payload.data === "object";
    const looksLegacyRoot =
      payload &&
      typeof payload === "object" &&
      !hasWrappedData &&
      (Array.isArray(payload.leaderboard) ||
        typeof payload.progress === "object" ||
        typeof payload.onboarding === "object" ||
        typeof payload.best === "number" ||
        typeof payload.best === "string" ||
        typeof payload.settings === "object");
    if (looksLegacyRoot) {
      notes.push("检测到旧版文件结构：已自动兼容解析");
    }

    const has = {
      leaderboard: Array.isArray(data.leaderboard),
      progress: Boolean(data.progress && typeof data.progress === "object"),
      onboarding: Boolean(data.onboarding && typeof data.onboarding === "object"),
      best: typeof data.best === "number" || typeof data.best === "string",
      settings: Boolean(data.settings && typeof data.settings === "object")
    };

    if (has.progress) {
      const p = data.progress;
      const legacyKeys = ["runs", "scoreSum", "mergeSum", "bestLevel", "longestDuration", "unlockedMilestones"].filter(
        (k) => p && Object.prototype.hasOwnProperty.call(p, k)
      );
      if (legacyKeys.length) notes.push("检测到旧版进度字段：已自动迁移");
    }
    if (has.settings) {
      const s = data.settings;
      if (
        (s && Object.prototype.hasOwnProperty.call(s, "audio")) ||
        (s && Object.prototype.hasOwnProperty.call(s, "shake"))
      ) {
        notes.push("检测到旧版设置字段：已自动迁移");
      }
    }
    if (typeof data.best === "string") {
      notes.push("最高分字段为字符串：会自动转成数字");
    }

    if (meta && typeof meta === "object" && typeof meta.version === "number" && meta.version > 1) {
      notes.push("文件版本较新：若导入异常请重新导出一次");
    }

    return { meta, data, has, notes };
  }

  function sortLeaderboard(entries) {
    return [...entries].sort((a, b) => (b.score || 0) - (a.score || 0) || (b.tier || 0) - (a.tier || 0));
  }

  function mergeLeaderboardEntries(currentEntries, importedEntries, limit = 5) {
    const merged = sortLeaderboard([...(currentEntries || []), ...(importedEntries || [])]);
    return merged.slice(0, limit);
  }

  function mergeProgress(current, incoming) {
    const cur = normalizeProgressData(current);
    const inc = normalizeProgressData(incoming);
    const unlocked = { ...cur.unlockedMilestoneKeys, ...inc.unlockedMilestoneKeys };
    return {
      totalRuns: cur.totalRuns + inc.totalRuns,
      totalScore: cur.totalScore + inc.totalScore,
      totalMerges: cur.totalMerges + inc.totalMerges,
      bestTier: Math.max(cur.bestTier, inc.bestTier),
      longestDurationSeconds: Math.max(cur.longestDurationSeconds, inc.longestDurationSeconds),
      unlockedMilestoneKeys: unlocked
    };
  }

  function mergeOnboarding(current, incoming) {
    const cur = current && typeof current === "object" ? current : {};
    const inc = incoming && typeof incoming === "object" ? incoming : {};
    const merged = { ...cur, ...inc };
    for (const step of ONBOARDING_STEPS) {
      merged[step.key] = Boolean(cur[step.key] || inc[step.key]);
    }
    merged.all_done =
      Boolean(cur.all_done || inc.all_done) ||
      ONBOARDING_STEPS.every((step) => Boolean(merged[step.key]));
    return merged;
  }

  function readRawLocalStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function writeRawLocalStorage(key, value) {
    try {
      if (value === null || value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch {
      // ignore
    }
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function readOperationLogs() {
    const raw = readRawLocalStorage(OPERATION_LOG_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeOperationLogs(logs) {
    writeRawLocalStorage(OPERATION_LOG_KEY, JSON.stringify(logs));
    renderOperationLogs();
  }

  function renderOperationLogs() {
    if (!operationLogList) return;
    const logs = readOperationLogs();
    if (!logs.length) {
      operationLogList.innerHTML = `<p class="backup-empty">还没有操作日志。恢复、归档、清理等关键动作会记录在这里。</p>`;
      return;
    }
    operationLogList.innerHTML = logs
      .map((entry) => {
        const title = escapeHtml(entry?.title || "未知操作");
        const detail = escapeHtml(entry?.detail || "");
        const time = escapeHtml(
          entry?.at
            ? new Date(entry.at).toLocaleString("zh-CN", { hour12: false })
            : "未知时间"
        );
        return `<div class="operation-log-item"><strong>${title}</strong><small>${time}${detail ? `\n${detail}` : ""}</small></div>`;
      })
      .join("");
  }

  function appendOperationLog(title, detail = "") {
    const logs = readOperationLogs();
    logs.unshift({
      at: new Date().toISOString(),
      title: String(title || "").trim().slice(0, 60),
      detail: String(detail || "").trim().slice(0, 240)
    });
    writeOperationLogs(logs.slice(0, 20));
  }

  function readExportRecords() {
    const raw = readRawLocalStorage(EXPORT_RECORD_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeExportRecords(records) {
    writeRawLocalStorage(EXPORT_RECORD_KEY, JSON.stringify(records));
    renderExportRecords();
  }

  function renderExportRecords() {
    if (!exportRecordList) return;
    const records = readExportRecords();
    if (!records.length) {
      exportRecordList.innerHTML = `<p class="backup-empty">还没有导出记录。置顶区导出成功后会记录在这里。</p>`;
      return;
    }
    exportRecordList.innerHTML = records
      .map((entry, index) => {
        const title = escapeHtml(entry?.title || "未知导出");
        const filename = escapeHtml(entry?.filename || "未知文件");
        const detail = escapeHtml(entry?.detail || "");
        const time = escapeHtml(
          entry?.at
            ? new Date(entry.at).toLocaleString("zh-CN", { hour12: false })
            : "未知时间"
        );
        const action = entry?.scope === "pinned"
          ? `<div class="record-actions"><button class="ghost-btn tiny-btn" type="button" data-repeat-export-record-index="${index}">同名再导出</button></div>`
          : "";
        return `<div class="operation-log-item"><strong>${title}</strong><small>${time}\n<span class="export-file">${filename}</span>${detail ? `\n${detail}` : ""}</small>${action}</div>`;
      })
      .join("");
  }

  function appendExportRecord(title, filename, detail = "", meta = {}) {
    const records = readExportRecords();
    records.unshift({
      at: new Date().toISOString(),
      title: String(title || "").trim().slice(0, 60),
      filename: String(filename || "").trim().slice(0, 80),
      detail: String(detail || "").trim().slice(0, 240),
      scope: String(meta.scope || "").trim().slice(0, 24),
      kind: String(meta.kind || "").trim().slice(0, 24),
      moduleKey: String(meta.moduleKey || "").trim().slice(0, 24),
      archived: Boolean(meta.archived)
    });
    writeExportRecords(records.slice(0, 20));
  }

  function readRestoreRecords() {
    const raw = readRawLocalStorage(RESTORE_RECORD_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeRestoreRecords(records) {
    writeRawLocalStorage(RESTORE_RECORD_KEY, JSON.stringify(records));
    renderRestoreRecords();
  }

  function getRestoreRecordFilters() {
    return {
      keyword: String(restoreRecordSearchInput?.value || "").trim().toLowerCase(),
      scope: restoreRecordScopeFilter?.value || "all",
      kind: restoreRecordKindFilter?.value || "all"
    };
  }

  function getRestoreScopeLabel(scope) {
    if (scope === "pinned") return "置顶区";
    if (scope === "group") return "分组";
    if (scope === "tag") return "标签";
    return "其他";
  }

  function getRestoreSourceTypeLabel(scope, archived) {
    if (scope === "pinned") return archived ? "置顶归档" : "置顶备份";
    if (scope === "group") return "普通分组";
    if (scope === "tag") return "标签集合";
    return "其他来源";
  }

  function getRestoreArchiveStateLabel(archived) {
    return archived ? "归档备份" : "活动备份";
  }

  function getBackupSourceLabel(source) {
    if (source === "import") return "导入前备份";
    if (source === "snapshot") return "快照备份";
    return String(source || "未知来源");
  }

  function formatRestoreBackupTime(createdAt) {
    if (!createdAt) return "";
    const value = new Date(createdAt);
    if (Number.isNaN(value.getTime())) return String(createdAt);
    return value.toLocaleString("zh-CN", { hour12: false });
  }

  function getRestoreTimeBucket(at) {
    const value = new Date(at || "");
    if (Number.isNaN(value.getTime())) return "older";
    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startTarget = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    const diffDays = Math.floor((startToday.getTime() - startTarget.getTime()) / 86400000);
    if (diffDays <= 0) return "today";
    if (diffDays <= 6) return "week";
    return "older";
  }

  function getRestoreTimeBucketLabel(bucket) {
    if (bucket === "today") return "今天";
    if (bucket === "week") return "最近 7 天";
    return "更早";
  }

  function getFilteredRestoreRecordItems() {
    const records = readRestoreRecords();
    const filters = getRestoreRecordFilters();
    return records
      .map((entry, index) => ({ entry, index }))
      .filter(({ entry }) => {
        if (filters.scope !== "all" && String(entry?.scope || "") !== filters.scope) return false;
        if (filters.kind !== "all" && String(entry?.kind || "") !== filters.kind) return false;
        if (!filters.keyword) return true;
        const haystack = `${entry?.title || ""} ${entry?.detail || ""} ${entry?.scope || ""} ${entry?.kind || ""} ${entry?.moduleKey || ""} ${entry?.sourceName || ""} ${entry?.backupLabel || ""} ${entry?.moduleLabel || ""} ${entry?.backupSourceLabel || ""} ${entry?.backupCreatedAt || ""} ${entry?.backupGroupLabel || ""} ${entry?.backupTagLabel || ""} ${entry?.backupNoteLabel || ""} ${getRestoreSourceTypeLabel(entry?.scope, entry?.archived)} ${getRestoreArchiveStateLabel(entry?.archived)}`.toLowerCase();
        return haystack.includes(filters.keyword);
      });
  }

  function buildRestoreRecordExportPayload() {
    const filters = getRestoreRecordFilters();
    const filteredItems = getFilteredRestoreRecordItems();
    const bucketOrder = ["today", "week", "older"];
    const grouped = new Map(bucketOrder.map((bucket) => [bucket, []]));
    filteredItems.forEach(({ entry, index }) => {
      const bucket = getRestoreTimeBucket(entry?.at);
      grouped.get(bucket)?.push({
        originalIndex: index,
        timeBucket: bucket,
        timeBucketLabel: getRestoreTimeBucketLabel(bucket),
        ...entry
      });
    });
    return {
      exportedAt: new Date().toISOString(),
      type: "restore-record-export",
      filters,
      count: filteredItems.length,
      buckets: bucketOrder
        .map((bucket) => ({
          key: bucket,
          label: getRestoreTimeBucketLabel(bucket),
          count: grouped.get(bucket)?.length || 0
        }))
        .filter((bucket) => bucket.count > 0),
      records: bucketOrder.flatMap((bucket) => grouped.get(bucket) || [])
    };
  }

  function buildRestoreRecordTextSummary(payload) {
    const lines = [
      "恢复记录导出摘要",
      `导出时间：${formatRestoreBackupTime(payload?.exportedAt) || payload?.exportedAt || "未知时间"}`,
      `记录数量：${payload?.count || 0}`,
      `范围筛选：${payload?.filters?.scope || "all"}`,
      `类型筛选：${payload?.filters?.kind || "all"}`,
      `关键词：${payload?.filters?.keyword || "无"}`,
      ""
    ];
    (payload?.buckets || []).forEach((bucket) => {
      lines.push(`${bucket.label}（${bucket.count}）`);
      (payload?.records || [])
        .filter((record) => record.timeBucket === bucket.key)
        .forEach((record) => {
          lines.push(`- ${record.title || "未知恢复"}`);
          lines.push(`  发生时间：${formatRestoreBackupTime(record.at) || record.at || "未知时间"}`);
          lines.push(`  范围：${getRestoreScopeLabel(record.scope)}`);
          lines.push(`  类别：${getRestoreSourceTypeLabel(record.scope, record.archived)}`);
          if (record.sourceName) lines.push(`  来源：${record.sourceName}`);
          if (record.backupLabel) lines.push(`  备份：${record.backupLabel}`);
          if (record.moduleLabel) lines.push(`  模块：${record.moduleLabel}`);
          if (record.backupSourceLabel) lines.push(`  备份来源：${record.backupSourceLabel}`);
          if (record.backupCreatedAt) lines.push(`  备份时间：${formatRestoreBackupTime(record.backupCreatedAt) || record.backupCreatedAt}`);
          if (record.backupGroupLabel) lines.push(`  备份分组：${record.backupGroupLabel}`);
          if (record.backupTagLabel) lines.push(`  备份标签：${record.backupTagLabel}`);
          if (record.backupNoteLabel) lines.push(`  备份备注：${record.backupNoteLabel}`);
          if (record.detail) lines.push(`  详情：${String(record.detail).replace(/\n+/g, " / ")}`);
        });
      lines.push("");
    });
    return lines.join("\n").trim();
  }

  function renderRestoreRecords() {
    if (!restoreRecordList) return;
    const records = readRestoreRecords();
    if (!records.length) {
      restoreRecordList.innerHTML = `<p class="backup-empty">还没有恢复记录。置顶区快捷恢复成功后会记录在这里。</p>`;
      return;
    }
    const filteredRecords = getFilteredRestoreRecordItems();
    if (!filteredRecords.length) {
      restoreRecordList.innerHTML = `<p class="backup-empty">没有符合当前筛选条件的恢复记录。</p>`;
      return;
    }
    const bucketOrder = ["today", "week", "older"];
    const grouped = new Map(bucketOrder.map((bucket) => [bucket, []]));
    filteredRecords.forEach((item) => {
      grouped.get(getRestoreTimeBucket(item.entry?.at))?.push(item);
    });
    restoreRecordList.innerHTML = bucketOrder
      .filter((bucket) => grouped.get(bucket)?.length)
      .map((bucket) => {
        const items = grouped.get(bucket) || [];
        const itemHtml = items
          .map(({ entry, index }) => {
            const title = escapeHtml(entry?.title || "未知恢复");
            const detail = escapeHtml(entry?.detail || "");
            const time = escapeHtml(
              entry?.at
                ? new Date(entry.at).toLocaleString("zh-CN", { hour12: false })
                : "未知时间"
            );
            const summaryParts = [
              `<span>范围：${escapeHtml(getRestoreScopeLabel(entry?.scope))}</span>`,
              `<span>类别：${escapeHtml(getRestoreSourceTypeLabel(entry?.scope, entry?.archived))}</span>`,
              `<span>状态：${escapeHtml(getRestoreArchiveStateLabel(entry?.archived))}</span>`,
              entry?.sourceName ? `<span>来源：${escapeHtml(entry.sourceName)}</span>` : "",
              entry?.backupSourceLabel ? `<span>备份来源：${escapeHtml(entry.backupSourceLabel)}</span>` : "",
              entry?.backupCreatedAt ? `<span>备份时间：${escapeHtml(formatRestoreBackupTime(entry.backupCreatedAt))}</span>` : "",
              entry?.backupGroupLabel ? `<span>备份分组：${escapeHtml(entry.backupGroupLabel)}</span>` : "",
              entry?.backupTagLabel ? `<span>备份标签：${escapeHtml(entry.backupTagLabel)}</span>` : "",
              entry?.backupNoteLabel ? `<span>备份备注：${escapeHtml(entry.backupNoteLabel)}</span>` : "",
              entry?.backupLabel ? `<span>备份：${escapeHtml(entry.backupLabel)}</span>` : "",
              entry?.moduleLabel ? `<span>模块：${escapeHtml(entry.moduleLabel)}</span>` : ""
            ].filter(Boolean).join("");
            const action = entry?.scope === "pinned"
              ? `<div class="record-actions"><button class="ghost-btn tiny-btn" type="button" data-repeat-restore-record-index="${index}">同源再恢复</button></div>`
              : "";
            return `<div class="operation-log-item"><strong>${title}</strong><div class="record-summary">${summaryParts}</div><small>${time}${detail ? `\n${detail}` : ""}</small>${action}</div>`;
          })
          .join("");
        return `<section class="record-time-group"><div class="record-time-head">${escapeHtml(getRestoreTimeBucketLabel(bucket))}</div>${itemHtml}</section>`;
      })
      .join("");
  }

  function appendRestoreRecord(title, detail = "", meta = {}) {
    const records = readRestoreRecords();
    records.unshift({
      at: new Date().toISOString(),
      title: String(title || "").trim().slice(0, 60),
      detail: String(detail || "").trim().slice(0, 240),
      scope: String(meta.scope || "").trim().slice(0, 24),
      kind: String(meta.kind || "").trim().slice(0, 24),
      moduleKey: String(meta.moduleKey || "").trim().slice(0, 24),
      archived: Boolean(meta.archived),
      sourceName: String(meta.sourceName || "").trim().slice(0, 40),
      backupLabel: String(meta.backupLabel || "").trim().slice(0, 60),
      moduleLabel: String(meta.moduleLabel || "").trim().slice(0, 24),
      backupSourceLabel: String(meta.backupSourceLabel || "").trim().slice(0, 24),
      backupCreatedAt: String(meta.backupCreatedAt || "").trim().slice(0, 40),
      backupGroupLabel: String(meta.backupGroupLabel || "").trim().slice(0, 24),
      backupTagLabel: String(meta.backupTagLabel || "").trim().slice(0, 32),
      backupNoteLabel: String(meta.backupNoteLabel || "").trim().slice(0, 40)
    });
    writeRestoreRecords(records.slice(0, 20));
  }

  function repeatPinnedRestoreRecord(record) {
    const archived = Boolean(record?.archived);
    const backups = readImportBackups();
    const scopedIndexes = backups
      .map((backup, index) => ({ backup, index }))
      .filter(({ backup }) => Boolean(backup?.pinned) && Boolean(backup?.archived) === archived)
      .map(({ index }) => index);
    if (!scopedIndexes.length) {
      window.alert("当前置顶区已经没有可恢复的备份了");
      return;
    }
    if (record?.kind === "module") {
      const moduleKey = String(record?.moduleKey || "").trim();
      const restoreIndex = pickLatestBackupIndex(scopedIndexes, { moduleKey });
      if (!Number.isFinite(restoreIndex) || restoreIndex < 0 || restoreIndex >= backups.length) {
        window.alert("当前置顶区里没有可恢复的对应模块");
        return;
      }
      const backup = backups[restoreIndex];
      if (!window.confirm(buildBackupQuickModuleRestoreConfirmText(backup, moduleKey))) return;
      const selection = {
        leaderboard: moduleKey === "leaderboard",
        progress: moduleKey === "progress",
        onboarding: moduleKey === "onboarding",
        best: moduleKey === "best",
        settings: moduleKey === "settings",
        mergeLeaderboard: false,
        mergeProgress: false,
        mergeOnboarding: false
      };
      try {
        const snapshotResult = createQuickRestoreProtectionSnapshot(`${getBackupDisplayName(backup)} ${getBackupModuleDisplayName(moduleKey)}`);
        const ok = restoreBackupSelectionAtIndex(restoreIndex, selection);
        if (!ok) {
          window.alert("恢复失败：置顶备份缺少该模块或模块无效");
          return;
        }
        appendRestoreRecord(`置顶区${getBackupModuleDisplayName(moduleKey)}恢复`, `${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`, {
          scope: "pinned",
          kind: "module",
          moduleKey,
          archived,
          sourceName: archived ? "置顶归档" : "置顶备份",
          backupLabel: getBackupDisplayName(backup),
          moduleLabel: getBackupModuleDisplayName(moduleKey),
          backupSourceLabel: getBackupSourceLabel(backup?.source),
          backupCreatedAt: backup?.createdAt || "",
          backupGroupLabel: getBackupGroupLabel(backup?.group),
          backupTagLabel: formatBackupTags(parseBackupTags(backup?.tag)),
          backupNoteLabel: backup?.note || ""
        });
        appendOperationLog(`再次恢复置顶区${getBackupModuleDisplayName(moduleKey)}`, `${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`);
        setStatus(snapshotResult.droppedCount ? `已再次恢复${getBackupModuleDisplayName(moduleKey)}，并创建保护快照（已自动淘汰一条旧备份）` : `已再次恢复${getBackupModuleDisplayName(moduleKey)}，并创建保护快照`);
      } catch (err) {
        window.alert(`恢复失败：${err instanceof Error ? err.message : String(err)}`);
      }
      return;
    }
    const restoreIndex = pickLatestBackupIndex(scopedIndexes);
    if (!Number.isFinite(restoreIndex) || restoreIndex < 0 || restoreIndex >= backups.length) {
      window.alert("当前置顶区里没有可用备份");
      return;
    }
    const backup = backups[restoreIndex];
    if (!window.confirm(buildBackupQuickRestoreConfirmText(backup))) return;
    try {
      const snapshotResult = createQuickRestoreProtectionSnapshot(getBackupDisplayName(backup));
      const ok = restoreBackupSelectionAtIndex(restoreIndex, getBackupSelectionFromAvailability(backup));
      if (!ok) {
        window.alert("恢复失败：置顶备份数据损坏或缺失");
        return;
      }
      appendRestoreRecord("置顶区整区恢复", `${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`, {
        scope: "pinned",
        kind: "bundle",
        archived,
        sourceName: archived ? "置顶归档" : "置顶备份",
        backupLabel: getBackupDisplayName(backup),
        backupSourceLabel: getBackupSourceLabel(backup?.source),
        backupCreatedAt: backup?.createdAt || "",
        backupGroupLabel: getBackupGroupLabel(backup?.group),
        backupTagLabel: formatBackupTags(parseBackupTags(backup?.tag)),
        backupNoteLabel: backup?.note || ""
      });
      appendOperationLog("再次恢复置顶区", `${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`);
      setStatus(snapshotResult.droppedCount ? "已再次恢复置顶区，并创建保护快照（已自动淘汰一条旧备份）" : "已再次恢复置顶区，并创建保护快照");
    } catch (err) {
      window.alert(`恢复失败：${err instanceof Error ? err.message : String(err)}`);
    }
  }

  function getPinnedBackupsForExport(archived = false) {
    const { active, archived: archivedBackups } = splitBackups(readImportBackups());
    const scoped = archived ? archivedBackups : active;
    return scoped.filter((backup) => Boolean(backup?.pinned));
  }

  function readImportBackups() {
    const rawList = readRawLocalStorage(IMPORT_BACKUPS_KEY);
    if (rawList) {
      try {
        const parsed = JSON.parse(rawList);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // ignore
      }
    }
    const legacy = readRawLocalStorage(IMPORT_BACKUP_KEY);
    if (legacy) {
      try {
        const parsed = JSON.parse(legacy);
        return [parsed];
      } catch {
        return [];
      }
    }
    return [];
  }

  function writeImportBackups(backups) {
    writeRawLocalStorage(IMPORT_BACKUPS_KEY, JSON.stringify(backups));
    writeRawLocalStorage(IMPORT_BACKUP_KEY, null);
    renderImportBackupHistory();
  }

  function saveImportBackup(noteOverride = "") {
    const note = noteOverride ? String(noteOverride).trim().slice(0, 40) : getBackupNote();
    return saveBackupPoint({ source: "import", note });
  }

  function pickDropIndex(backups, policy) {
    const candidateIndexes = backups
      .map((backup, index) => ({ backup, index }))
      .filter(({ backup }) => !backup?.pinned)
      .map(({ index }) => index);
    const pool = candidateIndexes.length ? candidateIndexes.map((index) => backups[index]) : backups;
    const mapIndex = (poolIndex) => (candidateIndexes.length ? candidateIndexes[poolIndex] : poolIndex);
    const isPlain = (backup) => !String(backup?.note || "").trim() && !String(backup?.tag || "").trim();
    if (policy === "keep_annotated") {
      const plainIndex = pool.findIndex((backup) => isPlain(backup));
      return plainIndex >= 0 ? mapIndex(plainIndex) : mapIndex(0);
    }
    if (policy === "balance_sources") {
      const counts = pool.reduce((acc, backup) => {
        const source = backup?.source || "import";
        acc[source] = (acc[source] || 0) + 1;
        return acc;
      }, {});
      const dominantSource =
        (counts.import || 0) > (counts.snapshot || 0)
          ? "import"
          : (counts.snapshot || 0) > (counts.import || 0)
            ? "snapshot"
            : null;
      if (dominantSource) {
        const candidateIndex = pool.findIndex((backup) => (backup?.source || "import") === dominantSource && isPlain(backup));
        if (candidateIndex >= 0) return mapIndex(candidateIndex);
        const sourceIndex = pool.findIndex((backup) => (backup?.source || "import") === dominantSource);
        if (sourceIndex >= 0) return mapIndex(sourceIndex);
      }
      const plainIndex = pool.findIndex((backup) => isPlain(backup));
      return plainIndex >= 0 ? mapIndex(plainIndex) : mapIndex(0);
    }
    return mapIndex(0);
  }

  function trimBackupsToPolicy(backups, policy, maxCount) {
    const list = [...backups];
    let droppedCount = 0;
    while (list.length > maxCount) {
      const dropIndex = pickDropIndex(list, policy);
      list.splice(dropIndex, 1);
      droppedCount += 1;
    }
    return { next: list, droppedCount };
  }

  function trimBackupsToPolicyWithDropped(backups, policy, maxCount) {
    const list = [...backups];
    const dropped = [];
    while (list.length > maxCount) {
      const dropIndex = pickDropIndex(list, policy);
      const removed = list.splice(dropIndex, 1)[0];
      if (removed) dropped.push(removed);
    }
    return { next: list, dropped };
  }

  function splitBackups(backups) {
    return {
      active: backups.filter((backup) => !backup?.archived),
      archived: backups.filter((backup) => Boolean(backup?.archived))
    };
  }

  function saveBackupPoint({ source = "import", note = "", nameOverride, groupOverride, tagOverride, useCurrentInputs = true } = {}) {
    const name =
      nameOverride !== undefined
        ? String(nameOverride || "").trim().slice(0, 32)
        : useCurrentInputs && backupNameInput
          ? String(backupNameInput.value || "").trim().slice(0, 32)
          : "";
    const group =
      groupOverride !== undefined
        ? String(groupOverride || "").trim().slice(0, 24)
        : useCurrentInputs && backupGroupInput
          ? String(backupGroupInput.value || "").trim().slice(0, 24)
          : "";
    const tag =
      tagOverride !== undefined
        ? normalizeBackupTagValue(tagOverride)
        : useCurrentInputs
          ? getBackupTag()
          : "";
    const backup = {
      createdAt: new Date().toISOString(),
      source,
      name,
      group,
      note: String(note || "").trim().slice(0, 40),
      tag,
      pinned: false,
      archived: false,
      storage: {
        [LEADERBOARD_KEY]: readRawLocalStorage(LEADERBOARD_KEY),
        [PROGRESS_KEY]: readRawLocalStorage(PROGRESS_KEY),
        [ONBOARDING_KEY]: readRawLocalStorage(ONBOARDING_KEY),
        [STORAGE_KEY]: readRawLocalStorage(STORAGE_KEY),
        [SETTINGS_KEY]: readRawLocalStorage(SETTINGS_KEY)
      }
    };
    const backups = readImportBackups();
    backups.push(backup);
    const { active } = splitBackups(backups);
    const { next: trimmedActive, droppedCount } = trimBackupsToPolicy(active, settings.backupCleanupPolicy, MAX_IMPORT_BACKUPS);
    const keptActive = new Set(trimmedActive);
    const next = backups.filter((item) => item?.archived || keptActive.has(item));
    writeImportBackups(next);
    return { droppedCount };
  }

  function createQuickRestoreProtectionSnapshot(label) {
    const note = `快捷恢复前：${String(label || "保护快照").trim()}`.slice(0, 40);
    return saveBackupPoint({
      source: "snapshot",
      note,
      nameOverride: "",
      groupOverride: "快捷恢复保护",
      tagOverride: "",
      useCurrentInputs: false
    });
  }

  function buildPayloadFromBackup(backup) {
    const storage = backup && backup.storage ? backup.storage : {};
    const leaderboardRaw = storage[LEADERBOARD_KEY];
    const progressRaw = storage[PROGRESS_KEY];
    const onboardingRaw = storage[ONBOARDING_KEY];
    const bestRaw = storage[STORAGE_KEY];
    const settingsRaw = storage[SETTINGS_KEY];

    let leaderboard;
    let progress;
    let onboarding;
    let settingsData;
    let best;

    try {
      if (leaderboardRaw) leaderboard = JSON.parse(leaderboardRaw);
    } catch {}
    try {
      if (progressRaw) progress = JSON.parse(progressRaw);
    } catch {}
    try {
      if (onboardingRaw) onboarding = JSON.parse(onboardingRaw);
    } catch {}
    try {
      if (settingsRaw) settingsData = JSON.parse(settingsRaw);
    } catch {}
    if (bestRaw != null) best = Number(bestRaw || 0);

    const includes = {
      leaderboard: Array.isArray(leaderboard),
      progress: Boolean(progress && typeof progress === "object"),
      onboarding: Boolean(onboarding && typeof onboarding === "object"),
      best: Number.isFinite(best),
      settings: Boolean(settingsData && typeof settingsData === "object")
    };

    return {
      meta: {
        app: "blob-merge-prototype",
        version: 1,
        exportedAt: new Date().toISOString(),
        name: backup?.name || "",
        group: backup?.group || "",
        pinned: Boolean(backup?.pinned),
        note: backup?.note || "",
        tag: backup?.tag || "",
        backupCreatedAt: backup?.createdAt || "",
        backupSource: backup?.source || "import",
        includes
      },
      data: {
        leaderboard: includes.leaderboard ? leaderboard : undefined,
        progress: includes.progress ? progress : undefined,
        onboarding: includes.onboarding ? onboarding : undefined,
        best: includes.best ? best : undefined,
        settings: includes.settings ? settingsData : undefined
      }
    };
  }

  function buildBackupBundlePayload(backups, title = "备份集合") {
    const list = Array.isArray(backups) ? backups.filter(Boolean) : [];
    return {
      meta: {
        exportedAt: new Date().toISOString(),
        type: "backup_bundle",
        title,
        count: list.length
      },
      backups: list.map((backup) => ({
        createdAt: backup?.createdAt || "",
        name: backup?.name || "",
        group: backup?.group || "",
        note: backup?.note || "",
        pinned: Boolean(backup?.pinned),
        archived: Boolean(backup?.archived),
        payload: buildPayloadFromBackup(backup)
      }))
    };
  }

  function buildBackupModuleBundlePayload(backups, moduleKey, title = "备份模块集合") {
    const list = Array.isArray(backups) ? backups.filter(Boolean) : [];
    const moduleBackups = list
      .filter((backup) => getBackupModuleAvailability(backup)[moduleKey])
      .map((backup) => ({
        createdAt: backup?.createdAt || "",
        name: backup?.name || "",
        group: backup?.group || "",
        note: backup?.note || "",
        pinned: Boolean(backup?.pinned),
        archived: Boolean(backup?.archived),
        payload: buildModulePayloadFromBackup(backup, moduleKey)
      }));
    return {
      meta: {
        exportedAt: new Date().toISOString(),
        type: "backup_module_bundle",
        title,
        exportedModule: moduleKey,
        count: moduleBackups.length
      },
      backups: moduleBackups
    };
  }

  function buildBackupSummaryBundlePayload(backups, title = "备份清单摘要") {
    const list = Array.isArray(backups) ? backups.filter(Boolean) : [];
    const summary = list.map((backup) => ({
      createdAt: backup?.createdAt || "",
      source: backup?.source || "import",
      name: backup?.name || "",
      group: backup?.group || "",
      note: backup?.note || "",
      pinned: Boolean(backup?.pinned),
      archived: Boolean(backup?.archived),
      tags: parseBackupTags(backup?.tag),
      includes: getBackupModuleAvailability(backup)
    }));
    return {
      meta: {
        exportedAt: new Date().toISOString(),
        type: "backup_summary_bundle",
        title,
        count: summary.length
      },
      backups: summary
    };
  }

  function pickLatestBackupIndex(indexes, options = {}) {
    const { moduleKey = "" } = options;
    const backups = readImportBackups();
    const candidates = (indexes || [])
      .map((index) => ({ index, backup: backups[index] }))
      .filter(({ index, backup }) => Number.isFinite(index) && backup);
    const filtered = moduleKey
      ? candidates.filter(({ backup }) => getBackupModuleAvailability(backup)[moduleKey])
      : candidates;
    if (!filtered.length) return -1;
    filtered.sort((a, b) => {
      const timeCompare = String(b.backup?.createdAt || "").localeCompare(String(a.backup?.createdAt || ""));
      return timeCompare || b.index - a.index;
    });
    return filtered[0].index;
  }

  function getBackupModuleDisplayName(moduleKey) {
    const moduleNameMap = {
      leaderboard: "排行榜",
      progress: "长期进度",
      onboarding: "引导进度",
      best: "最高分",
      settings: "设置"
    };
    return moduleNameMap[moduleKey] || moduleKey;
  }

  function restoreBackupSelectionAtIndex(index, selection) {
    const backups = readImportBackups();
    if (index < 0 || index >= backups.length) return false;
    const backup = backups[index];
    const payload = buildPayloadFromBackup(backup);
    applyImportPayload(payload, selection);
    renderImportBackupHistory();
    return true;
  }

  function buildBackupQuickRestoreConfirmText(backup) {
    const diff = buildBackupDiffPreview(backup);
    return `确认用这条置顶备份快速恢复当前本地数据吗？\n\n${diff}\n\n恢复前会自动创建一条保护快照，且不会清空现有备份记录。`;
  }

  function buildBackupQuickModuleRestoreConfirmText(backup, moduleKey) {
    return `${buildBackupModuleRestoreConfirmText(backup, moduleKey)}\n\n恢复前会自动创建一条保护快照，且不会清空现有备份记录。`;
  }

  function repeatPinnedExportRecord(record) {
    const archived = Boolean(record?.archived);
    const selectedBackups = getPinnedBackupsForExport(archived);
    if (!selectedBackups.length) {
      window.alert("当前置顶区已经没有可导出的备份了");
      return;
    }
    const filename = String(record?.filename || "").trim();
    if (!filename) {
      window.alert("这条导出记录缺少文件名，无法复用");
      return;
    }
    const scopeTitle = archived ? "置顶归档" : "置顶备份";
    if (record?.kind === "summary") {
      const title = archived ? "置顶归档清单" : "置顶备份清单";
      const bundle = buildBackupSummaryBundlePayload(selectedBackups, title);
      downloadJson(filename, bundle);
      appendExportRecord("置顶区清单摘要", filename, `${title}\n数量：${selectedBackups.length}`, { scope: "pinned", kind: "summary", archived });
      appendOperationLog("再次导出置顶区清单摘要", `${title}\n数量：${selectedBackups.length}`);
      setStatus("已按原文件名再次导出清单摘要");
      return;
    }
    if (record?.kind === "module") {
      const moduleKey = String(record?.moduleKey || "").trim();
      const moduleName = getBackupModuleDisplayName(moduleKey);
      const bundle = buildBackupModuleBundlePayload(selectedBackups, moduleKey, `${scopeTitle}${moduleName}`);
      if (!bundle.backups.length) {
        window.alert("再次导出失败：当前置顶区里没有这个模块的数据");
        return;
      }
      downloadJson(filename, bundle);
      appendExportRecord("置顶区模块导出", filename, `${scopeTitle}\n模块：${moduleName}\n数量：${bundle.backups.length}`, { scope: "pinned", kind: "module", archived, moduleKey });
      appendOperationLog("再次导出置顶区模块集", `${scopeTitle}\n模块：${moduleName}\n数量：${bundle.backups.length}`);
      setStatus(`已按原文件名再次导出${moduleName}合集`);
      return;
    }
    const bundle = buildBackupBundlePayload(selectedBackups, scopeTitle);
    downloadJson(filename, bundle);
    appendExportRecord("置顶区整包导出", filename, `${scopeTitle}\n数量：${selectedBackups.length}`, { scope: "pinned", kind: "bundle", archived });
    appendOperationLog("再次导出置顶区", `${scopeTitle}\n数量：${selectedBackups.length}`);
    setStatus("已按原文件名再次导出置顶区");
  }

  function restoreImportBackup() {
    const backups = readImportBackups();
    if (!backups.length) return false;
    return restoreImportBackupAtIndex(backups.length - 1);
  }

  function clearImportBackup() {
    writeRawLocalStorage(IMPORT_BACKUPS_KEY, null);
    writeRawLocalStorage(IMPORT_BACKUP_KEY, null);
    renderImportBackupHistory();
  }

  function summarizeBackupStorage(storage) {
    let leaderboardCount = 0;
    let totalRuns = 0;
    let onboardingCompleted = 0;
    try {
      const leaderboard = JSON.parse(storage?.[LEADERBOARD_KEY] || "[]");
      if (Array.isArray(leaderboard)) leaderboardCount = leaderboard.length;
    } catch {
      // ignore
    }
    try {
      const progress = normalizeProgressData(JSON.parse(storage?.[PROGRESS_KEY] || "{}"));
      totalRuns = progress.totalRuns;
    } catch {
      // ignore
    }
    try {
      const onboarding = JSON.parse(storage?.[ONBOARDING_KEY] || "{}");
      onboardingCompleted = countCompletedOnboarding(onboarding);
    } catch {
      // ignore
    }
    return { leaderboardCount, totalRuns, onboardingCompleted };
  }

  function buildBackupDetailText(backup) {
    const storage = backup?.storage || {};
    let lines = [];
    lines.push(`创建时间：${backup?.createdAt || "未知"}`);
    lines.push(`来源：${backup?.source === "snapshot" ? "快照" : "导入前"}`);
    if (backup?.pinned) lines.push("状态：已置顶");
    if (backup?.name) lines.push(`名称：${backup.name}`);
    if (backup?.group) lines.push(`分组：${backup.group}`);
    if (backup?.note) lines.push(`备注：${backup.note}`);
    const tagList = parseBackupTags(backup?.tag);
    if (tagList.length) lines.push(`标签：${formatBackupTags(tagList)}`);

    try {
      const leaderboard = JSON.parse(storage[LEADERBOARD_KEY] || "[]");
      if (Array.isArray(leaderboard)) {
        lines.push(`排行榜：${leaderboard.length} 条`);
      }
    } catch {}
    try {
      const progress = normalizeProgressData(JSON.parse(storage[PROGRESS_KEY] || "{}"));
      lines.push(`长期进度：累计局数 ${progress.totalRuns}，总分 ${progress.totalScore}，最高等级 ${progress.bestTier}`);
    } catch {}
    try {
      const onboarding = JSON.parse(storage[ONBOARDING_KEY] || "{}");
      lines.push(`引导进度：${countCompletedOnboarding(onboarding)}/${ONBOARDING_STEPS.length}`);
    } catch {}
    try {
      const best = Number(storage[STORAGE_KEY] || 0);
      lines.push(`最高分：${best}`);
    } catch {}
    try {
      const s = normalizeSettingsData(JSON.parse(storage[SETTINGS_KEY] || "{}"));
      lines.push(`设置：音效 ${s.audioEnabled ? "开" : "关"}，晃动 ${s.shakeEnabled ? "开" : "关"}，音量 ${(s.volume * 100).toFixed(0)}`);
    } catch {}
    return lines.join("\n");
  }

  function getBackupDisplayName(backup) {
    const parts = [];
    if (backup?.name) parts.push(String(backup.name).trim());
    if (backup?.note) parts.push(String(backup.note).trim());
    const tagList = parseBackupTags(backup?.tag);
    if (tagList.length) parts.push(`#${tagList[0]}`);
    if (!parts.length) parts.push(backup?.createdAt || "未知备份");
    return parts.join(" ");
  }

  function getBackupGroupLabel(group) {
    const normalized = String(group || "").trim();
    return normalized || "未分组";
  }

  function getBackupGroupStateKey(groupKey, archived = false) {
    return `${archived ? "archived" : "active"}:${groupKey}`;
  }

  function renderBackupGroupFilterOptions(backups) {
    if (!backupGroupFilter) return;
    const groups = [...new Set(backups.map((backup) => String(backup?.group || "").trim()).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, "zh-CN")
    );
    const current = String(state.selectedBackupGroupFilter || "all");
    backupGroupFilter.innerHTML = [
      `<option value="all">全部分组</option>`,
      `<option value="__ungrouped__">未分组</option>`,
      ...groups.map((group) => `<option value="${group}">${group}</option>`)
    ].join("");
    const valid = current === "all" || current === "__ungrouped__" || groups.includes(current);
    state.selectedBackupGroupFilter = valid ? current : "all";
    backupGroupFilter.value = state.selectedBackupGroupFilter;
  }

  function setSelectedBackupTagFilters(values, availableTags = []) {
    const allowed = new Set(["__untagged__", ...availableTags]);
    const normalized = [...new Set((values || []).map((value) => String(value).trim()).filter(Boolean))]
      .filter((value) => value !== "all")
      .filter((value) => allowed.has(value));
    state.selectedBackupTagFilters = normalized;
  }

  function renderBackupTagFilterOptions(backups) {
    if (!backupTagFilter) return;
    const tags = [...new Set(backups.flatMap((backup) => parseBackupTags(backup?.tag)))].sort((a, b) => a.localeCompare(b, "zh-CN"));
    const current = Array.isArray(state.selectedBackupTagFilters) ? state.selectedBackupTagFilters : [];
    const options = [
      `<option value="all">全部标签（清空）</option>`,
      `<option value="__untagged__">无标签</option>`,
      ...tags.map((tag) => `<option value="${tag}">${tag}</option>`)
    ].join("");
    backupTagFilter.innerHTML = options;
    setSelectedBackupTagFilters(current, tags);
    const normalized = state.selectedBackupTagFilters;
    Array.from(backupTagFilter.options).forEach((option) => {
      option.selected = normalized.length ? normalized.includes(option.value) : option.value === "all";
    });
    renderSelectedTagSummary();
  }

  function getBackupTagLabel(tag) {
    return tag === "__untagged__" ? "无标签" : String(tag || "").trim() || "无标签";
  }

  function getBackupIndexesByTag(backups, tag) {
    return backups
      .map((backup, index) => ({ backup, index }))
      .filter(({ backup }) => {
        const tags = parseBackupTags(backup?.tag);
        return tag === "__untagged__" ? !tags.length : tags.includes(tag);
      })
      .map(({ index }) => index);
  }

  function renderBackupTagStats(backups) {
    if (!backupTagStats) return;
    const counts = backups.reduce((acc, backup) => {
      const tags = parseBackupTags(backup?.tag);
      if (!tags.length) {
        acc["__untagged__"] = (acc["__untagged__"] || 0) + 1;
        return acc;
      }
      tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    const current = Array.isArray(state.selectedBackupTagFilters) ? state.selectedBackupTagFilters : [];
    const entries = Object.entries(counts).sort((a, b) => {
      if (a[0] === "__untagged__") return 1;
      if (b[0] === "__untagged__") return -1;
      return a[0].localeCompare(b[0], "zh-CN");
    });
    if (!entries.length) {
      backupTagStats.innerHTML = `<span class="backup-empty">暂无标签统计</span>`;
      return;
    }
    backupTagStats.innerHTML = [
      `<div class="tag-stat-entry"><button class="tag-stat-chip ${current.length ? "" : "active"}" type="button" data-tag-stat="all"><span>全部</span><strong>${backups.length}</strong></button></div>`,
      ...entries
      .map(([tag, count]) => {
        const label = getBackupTagLabel(tag);
        const active = current.includes(tag) ? "active" : "";
        const indexList = getBackupIndexesByTag(backups, tag).join(",");
        const safeTag = escapeHtml(tag);
        const safeLabel = escapeHtml(label);
        return `<div class="tag-stat-entry">
          <button class="tag-stat-chip ${active}" type="button" data-tag-stat="${safeTag}"><span>${safeLabel}</span><strong>${count}</strong></button>
          <button class="ghost-btn tiny-btn" type="button" data-restore-tag-indexes="${indexList}" data-restore-tag-label="${safeLabel}">恢复标签</button>
          <button class="ghost-btn tiny-btn" type="button" data-restore-tag-module-indexes="${indexList}:leaderboard" data-restore-tag-label="${safeLabel}">恢复排行榜</button>
          <button class="ghost-btn tiny-btn" type="button" data-restore-tag-module-indexes="${indexList}:progress" data-restore-tag-label="${safeLabel}">恢复长期进度</button>
          <button class="ghost-btn tiny-btn" type="button" data-restore-tag-module-indexes="${indexList}:onboarding" data-restore-tag-label="${safeLabel}">恢复引导进度</button>
          <button class="ghost-btn tiny-btn" type="button" data-restore-tag-module-indexes="${indexList}:best" data-restore-tag-label="${safeLabel}">恢复最高分</button>
          <button class="ghost-btn tiny-btn" type="button" data-restore-tag-module-indexes="${indexList}:settings" data-restore-tag-label="${safeLabel}">恢复设置</button>
        </div>`;
      })
    ].join("");
    renderSelectedTagSummary();
  }

  function renderBackupPolicyPreview(backups) {
    if (!backupPolicyPreview) return;
    if (!backups.length) {
      backupPolicyPreview.textContent = "还没有备份记录。创建第一条备份后，这里会显示清理策略模拟结果。";
      backupPolicyPreview.classList.add("empty");
      return;
    }

    const policyText =
      settings.backupCleanupPolicy === "keep_annotated"
        ? "优先保留有备注/标签"
        : settings.backupCleanupPolicy === "balance_sources"
          ? "尽量平衡导入前与快照"
          : "优先保留最近备份";

    const note = getBackupNote();
    const tag = getBackupTag();
    const importCandidate = {
      createdAt: "下一条导入前备份",
      source: "import",
      note,
      tag
    };
    const snapshotCandidate = {
      createdAt: "下一条快照备份",
      source: "snapshot",
      note,
      tag
    };

    const importResult = trimBackupsToPolicyWithDropped([...backups, importCandidate], settings.backupCleanupPolicy, MAX_IMPORT_BACKUPS);
    const snapshotResult = trimBackupsToPolicyWithDropped([...backups, snapshotCandidate], settings.backupCleanupPolicy, MAX_IMPORT_BACKUPS);
    const importDrop = importResult.dropped[0];
    const snapshotDrop = snapshotResult.dropped[0];

    const lines = [];
    lines.push(`当前策略：${policyText}`);
    lines.push("置顶保护：自动清理会优先保留已置顶备份，只有在全是置顶备份时才会继续淘汰。");
    if (backups.length < MAX_IMPORT_BACKUPS) {
      lines.push(`当前为 ${backups.length}/${MAX_IMPORT_BACKUPS}，现在新增备份还不会触发淘汰。`);
      lines.push(`满额后再新增“导入前备份”时，预计优先淘汰：${importDrop ? getBackupDisplayName(importDrop) : "暂无"}`);
      lines.push(`满额后再新增“快照备份”时，预计优先淘汰：${snapshotDrop ? getBackupDisplayName(snapshotDrop) : "暂无"}`);
    } else {
      lines.push(`如果现在新增“导入前备份”，预计淘汰：${importDrop ? getBackupDisplayName(importDrop) : "暂无"}`);
      lines.push(`如果现在新增“快照备份”，预计淘汰：${snapshotDrop ? getBackupDisplayName(snapshotDrop) : "暂无"}`);
    }
    backupPolicyPreview.textContent = lines.join("\n");
    backupPolicyPreview.classList.remove("empty");
  }

  function getBackupFilters() {
    return {
      keyword: String(backupSearchInput?.value || "").trim().toLowerCase(),
      source: backupSourceFilter?.value || "all",
      pinned: backupPinnedFilter?.value || "all",
      group: backupGroupFilter?.value || "all",
      tags: Array.isArray(state.selectedBackupTagFilters) ? state.selectedBackupTagFilters : [],
      sort: backupSortOrder?.value || "newest"
    };
  }

  function sortBackups(backups, sort) {
    const list = [...backups];
    const comparePinned = (a, b) => Number(Boolean(b?.pinned)) - Number(Boolean(a?.pinned));
    if (sort === "oldest") {
      return list.sort((a, b) => comparePinned(a, b) || String(a?.createdAt || "").localeCompare(String(b?.createdAt || "")));
    }
    if (sort === "note") {
      return list.sort((a, b) => comparePinned(a, b) || String(a?.note || "").localeCompare(String(b?.note || ""), "zh-CN"));
    }
    if (sort === "source") {
      return list.sort((a, b) => comparePinned(a, b) || String(a?.source || "").localeCompare(String(b?.source || ""), "zh-CN"));
    }
    return list.sort((a, b) => comparePinned(a, b) || String(b?.createdAt || "").localeCompare(String(a?.createdAt || "")));
  }

  function getBackupModuleAvailability(backup) {
    const storage = backup?.storage || {};
    return {
      leaderboard: Boolean(storage[LEADERBOARD_KEY]),
      progress: Boolean(storage[PROGRESS_KEY]),
      onboarding: Boolean(storage[ONBOARDING_KEY]),
      best: storage[STORAGE_KEY] != null,
      settings: Boolean(storage[SETTINGS_KEY])
    };
  }

  function buildModulePayloadFromBackup(backup, moduleKey) {
    const full = buildPayloadFromBackup(backup);
    const includes = {
      leaderboard: false,
      progress: false,
      onboarding: false,
      best: false,
      settings: false
    };
    if (!Object.prototype.hasOwnProperty.call(includes, moduleKey)) {
      throw new Error("未知导出模块");
    }
    includes[moduleKey] = true;
    return {
      meta: {
        ...full.meta,
        includes,
        exportedModule: moduleKey
      },
      data: {
        leaderboard: moduleKey === "leaderboard" ? full.data.leaderboard : undefined,
        progress: moduleKey === "progress" ? full.data.progress : undefined,
        onboarding: moduleKey === "onboarding" ? full.data.onboarding : undefined,
        best: moduleKey === "best" ? full.data.best : undefined,
        settings: moduleKey === "settings" ? full.data.settings : undefined
      }
    };
  }

  function filterBackups(backups, filters) {
    return backups.filter((backup) => {
      const sourceOk = filters.source === "all" ? true : (backup?.source || "import") === filters.source;
      if (!sourceOk) return false;
      const pinnedOk =
        filters.pinned === "all"
          ? true
          : filters.pinned === "pinned"
            ? Boolean(backup?.pinned)
            : !backup?.pinned;
      if (!pinnedOk) return false;
      const groupValue = String(backup?.group || "").trim();
      const groupOk =
        filters.group === "all"
          ? true
          : filters.group === "__ungrouped__"
            ? !groupValue
            : groupValue === filters.group;
      if (!groupOk) return false;
      const tagList = parseBackupTags(backup?.tag);
      const tagOk =
        !filters.tags.length
          ? true
          : filters.tags.some((tag) => (tag === "__untagged__" ? !tagList.length : tagList.includes(tag)));
      if (!tagOk) return false;
      if (!filters.keyword) return true;
      const haystack = `${backup?.createdAt || ""} ${backup?.name || ""} ${backup?.group || ""} ${backup?.note || ""} ${backup?.tag || ""} ${backup?.source || ""}`.toLowerCase();
      return haystack.includes(filters.keyword);
    });
  }

  function filterArchivedBackups(backups, keyword) {
    const normalizedKeyword = String(keyword || "").trim().toLowerCase();
    if (!normalizedKeyword) return backups;
    return backups.filter((backup) => {
      const haystack = `${backup?.createdAt || ""} ${backup?.name || ""} ${backup?.group || ""} ${backup?.note || ""} ${backup?.tag || ""} ${backup?.source || ""}`.toLowerCase();
      return haystack.includes(normalizedKeyword);
    });
  }

  function renderArchivedStats(archivedBackups) {
    if (!archivedStatsGrid) return;
    const sourceCounts = archivedBackups.reduce((acc, backup) => {
      const source = backup?.source || "import";
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});
    const tagCounts = archivedBackups.reduce((acc, backup) => {
      const tags = parseBackupTags(backup?.tag);
      if (!tags.length) {
        acc.__untagged__ = (acc.__untagged__ || 0) + 1;
        return acc;
      }
      tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
    const topTagEntry = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0];
    archivedStatsGrid.innerHTML = `
      <div class="mini-stat">
        <span>归档总数</span>
        <strong>${archivedBackups.length}</strong>
      </div>
      <div class="mini-stat">
        <span>导入前</span>
        <strong>${sourceCounts.import || 0}</strong>
      </div>
      <div class="mini-stat">
        <span>快照</span>
        <strong>${sourceCounts.snapshot || 0}</strong>
      </div>
      <div class="mini-stat">
        <span>热门标签</span>
        <strong>${topTagEntry ? `${topTagEntry[0] === "__untagged__" ? "无标签" : topTagEntry[0]} · ${topTagEntry[1]}` : "暂无"}</strong>
      </div>
    `;
  }

  function renderGroupedBackupList(backups, allBackups, options = {}) {
    const { archived = false, emptyText = "" } = options;
    if (!backups.length) return emptyText ? `<p class="backup-empty">${emptyText}</p>` : "";
    const groups = [];
    const groupMap = new Map();
    backups.forEach((backup, index) => {
      const key = String(backup?.group || "").trim() || "__ungrouped__";
      if (!groupMap.has(key)) {
        const entry = { key, label: getBackupGroupLabel(backup?.group), items: [] };
        groupMap.set(key, entry);
        groups.push(entry);
      }
      groupMap.get(key).items.push({ backup, index });
    });
    return groups
      .map((group) => {
        const groupIndexes = group.items.map(({ backup }) => allBackups.indexOf(backup)).filter((index) => index >= 0);
        const indexList = groupIndexes.join(",");
        const collapseKey = getBackupGroupStateKey(group.key, archived);
        const collapsed = Boolean(state.collapsedBackupGroups[collapseKey]);
        const items = group.items
          .map(({ backup, index }) => {
            const originalIndex = allBackups.indexOf(backup);
            const label = archived ? `归档结果第 ${index + 1} 条` : `结果第 ${index + 1} 条`;
            return buildBackupCard(backup, originalIndex, label, { archived });
          })
          .join("");
        return `<div class="backup-group-block">
          <div class="backup-group-title">
            <div class="backup-group-title-main">
              <span>${group.label}</span>
              <small>${group.items.length} 条</small>
            </div>
            <div class="backup-group-actions">
              <button class="ghost-btn tiny-btn" type="button" data-toggle-backup-group="${collapseKey}">${collapsed ? "展开分组" : "折叠分组"}</button>
              <button class="ghost-btn tiny-btn" type="button" data-restore-named-group-indexes="${indexList}">恢复分组</button>
              <button class="ghost-btn tiny-btn" type="button" data-restore-named-group-module-indexes="${indexList}:leaderboard">恢复排行榜集</button>
              <button class="ghost-btn tiny-btn" type="button" data-restore-named-group-module-indexes="${indexList}:progress">恢复长期进度集</button>
              <button class="ghost-btn tiny-btn" type="button" data-restore-named-group-module-indexes="${indexList}:onboarding">恢复引导进度集</button>
              <button class="ghost-btn tiny-btn" type="button" data-restore-named-group-module-indexes="${indexList}:best">恢复最高分集</button>
              <button class="ghost-btn tiny-btn" type="button" data-restore-named-group-module-indexes="${indexList}:settings">恢复设置集</button>
              <button class="ghost-btn tiny-btn" type="button" data-batch-tag-group-indexes="${indexList}">整组打标签</button>
              <button class="ghost-btn tiny-btn" type="button" data-batch-rename-group-indexes="${indexList}">整组改名</button>
              <button class="ghost-btn tiny-btn" type="button" data-batch-regroup-indexes="${indexList}">整组改组</button>
            </div>
          </div>
          ${collapsed ? "" : items}
        </div>`;
      })
      .join("");
  }

  function renderPinnedBackupBlock(backups, allBackups, options = {}) {
    const { archived = false, title = "置顶备份" } = options;
    if (!backups.length) return "";
    const blockKey = getBackupGroupStateKey("__pinned__", archived);
    const collapsed = Boolean(state.collapsedBackupGroups[blockKey]);
    const indexList = backups.map((backup) => allBackups.indexOf(backup)).filter((index) => index >= 0).join(",");
    const items = backups
      .map((backup, index) => {
        const originalIndex = allBackups.indexOf(backup);
        const label = archived ? `置顶归档第 ${index + 1} 条` : `置顶结果第 ${index + 1} 条`;
        return buildBackupCard(backup, originalIndex, label, { archived });
      })
      .join("");
    return `<div class="backup-group-block pinned-block">
      <div class="backup-group-title">
        <div class="backup-group-title-main">
          <span>${title}</span>
          <small>${backups.length} 条</small>
        </div>
        <div class="backup-group-actions">
          <button class="ghost-btn tiny-btn" type="button" data-toggle-backup-group="${blockKey}">${collapsed ? "展开置顶" : "折叠置顶"}</button>
          <button class="ghost-btn tiny-btn" type="button" data-restore-group-indexes="${indexList}">恢复置顶区</button>
          <button class="ghost-btn tiny-btn" type="button" data-restore-group-module-indexes="${indexList}:leaderboard">恢复排行榜集</button>
          <button class="ghost-btn tiny-btn" type="button" data-restore-group-module-indexes="${indexList}:progress">恢复长期进度集</button>
          <button class="ghost-btn tiny-btn" type="button" data-restore-group-module-indexes="${indexList}:onboarding">恢复引导进度集</button>
          <button class="ghost-btn tiny-btn" type="button" data-restore-group-module-indexes="${indexList}:best">恢复最高分集</button>
          <button class="ghost-btn tiny-btn" type="button" data-restore-group-module-indexes="${indexList}:settings">恢复设置集</button>
          <button class="ghost-btn tiny-btn" type="button" data-export-group-summary-indexes="${indexList}">导出清单摘要</button>
          <button class="ghost-btn tiny-btn" type="button" data-export-group-indexes="${indexList}">导出置顶区</button>
          <button class="ghost-btn tiny-btn" type="button" data-export-group-module-indexes="${indexList}:leaderboard">导出排行榜集</button>
          <button class="ghost-btn tiny-btn" type="button" data-export-group-module-indexes="${indexList}:progress">导出长期进度集</button>
          <button class="ghost-btn tiny-btn" type="button" data-export-group-module-indexes="${indexList}:onboarding">导出引导进度集</button>
          <button class="ghost-btn tiny-btn" type="button" data-export-group-module-indexes="${indexList}:best">导出最高分集</button>
          <button class="ghost-btn tiny-btn" type="button" data-export-group-module-indexes="${indexList}:settings">导出设置集</button>
          <button class="ghost-btn tiny-btn" type="button" data-unpin-group-indexes="${indexList}">取消全部置顶</button>
        </div>
      </div>
      ${collapsed ? "" : items}
    </div>`;
  }

  function buildBackupCard(backup, originalIndex, label, options = {}) {
    const { archived = false } = options;
    const summary = summarizeBackupStorage(backup.storage || {});
    const source = backup.source || "import";
    const sourceText = source === "snapshot" ? "快照" : "导入前";
    const sourceClass = source === "snapshot" ? "snapshot" : "import";
    const pinned = Boolean(backup?.pinned);
    const name = backup.name ? String(backup.name).trim() : "";
    const group = backup.group ? String(backup.group).trim() : "";
    const note = backup.note ? String(backup.note).trim() : "";
    const tagList = parseBackupTags(backup?.tag);
    const expanded = Boolean(state.expandedBackupIndexes[originalIndex]);
    const selected = archived ? Boolean(state.selectedArchivedBackupIndexes[originalIndex]) : Boolean(state.selectedBackupIndexes[originalIndex]);
    const availability = getBackupModuleAvailability(backup);
    return `
      <div class="backup-item ${selected ? "selected" : ""}">
        <div class="backup-row-head">
          ${archived
            ? `<input class="backup-select" type="checkbox" ${selected ? "checked" : ""} data-select-archived-backup-index="${originalIndex}" />`
            : `<input class="backup-select" type="checkbox" ${selected ? "checked" : ""} data-select-backup-index="${originalIndex}" />`}
          <strong>${name ? `${name} · ${backup.createdAt || "未知时间"}` : `${label}：${backup.createdAt || "未知时间"}`}</strong>
        </div>
        <small>排行榜 ${summary.leaderboardCount} 条，累计局数 ${summary.totalRuns}，引导进度 ${summary.onboardingCompleted}/${ONBOARDING_STEPS.length}</small>
        <div class="backup-badges">
          <span class="backup-badge ${sourceClass}">${sourceText}</span>
          ${pinned ? `<span class="backup-badge pinned">已置顶</span>` : ""}
          ${archived ? `<span class="backup-badge archived">已归档</span>` : ""}
          ${group ? `<span class="backup-badge group">${group}</span>` : ""}
          ${note ? `<span class="backup-badge">${note}</span>` : ""}
          ${tagList.map((t) => `<span class="backup-badge tag">${t}</span>`).join("")}
        </div>
        <div class="backup-actions">
          <button class="ghost-btn tiny-btn" type="button" data-restore-backup-index="${originalIndex}">恢复到此</button>
          <button class="ghost-btn tiny-btn" type="button" data-export-backup-index="${originalIndex}">导出此备份</button>
          <button class="ghost-btn tiny-btn" type="button" data-toggle-pin-backup-index="${originalIndex}">${pinned ? "取消置顶" : "置顶"}</button>
          <button class="ghost-btn tiny-btn" type="button" data-edit-backup-name-index="${originalIndex}">改名称</button>
          <button class="ghost-btn tiny-btn" type="button" data-edit-backup-group-index="${originalIndex}">改分组</button>
          <button class="ghost-btn tiny-btn" type="button" data-edit-backup-index="${originalIndex}">改备注</button>
          <button class="ghost-btn tiny-btn" type="button" data-toggle-backup-index="${originalIndex}">${expanded ? "收起详情" : "展开详情"}</button>
          ${archived
            ? `<button class="ghost-btn tiny-btn" type="button" data-unarchive-backup-index="${originalIndex}">取消归档</button>`
            : `<button class="ghost-btn tiny-btn" type="button" data-archive-backup-index="${originalIndex}">归档</button>`}
        </div>
        ${expanded ? `
          <div class="backup-detail">${buildBackupDetailText(backup)}</div>
          <div class="backup-detail">${buildBackupDiffPreview(backup)}</div>
          <div class="backup-module-actions">
            ${availability.leaderboard ? `<button class="ghost-btn tiny-btn" type="button" data-restore-backup-module="${originalIndex}:leaderboard">仅恢复排行榜</button>` : ""}
            ${availability.progress ? `<button class="ghost-btn tiny-btn" type="button" data-restore-backup-module="${originalIndex}:progress">仅恢复长期进度</button>` : ""}
            ${availability.onboarding ? `<button class="ghost-btn tiny-btn" type="button" data-restore-backup-module="${originalIndex}:onboarding">仅恢复引导进度</button>` : ""}
            ${availability.best ? `<button class="ghost-btn tiny-btn" type="button" data-restore-backup-module="${originalIndex}:best">仅恢复最高分</button>` : ""}
            ${availability.settings ? `<button class="ghost-btn tiny-btn" type="button" data-restore-backup-module="${originalIndex}:settings">仅恢复设置</button>` : ""}
            ${availability.leaderboard ? `<button class="ghost-btn tiny-btn" type="button" data-export-backup-module="${originalIndex}:leaderboard">仅导出排行榜</button>` : ""}
            ${availability.progress ? `<button class="ghost-btn tiny-btn" type="button" data-export-backup-module="${originalIndex}:progress">仅导出长期进度</button>` : ""}
            ${availability.onboarding ? `<button class="ghost-btn tiny-btn" type="button" data-export-backup-module="${originalIndex}:onboarding">仅导出引导进度</button>` : ""}
            ${availability.best ? `<button class="ghost-btn tiny-btn" type="button" data-export-backup-module="${originalIndex}:best">仅导出最高分</button>` : ""}
            ${availability.settings ? `<button class="ghost-btn tiny-btn" type="button" data-export-backup-module="${originalIndex}:settings">仅导出设置</button>` : ""}
          </div>
        ` : ""}
      </div>
    `;
  }

  function renderImportBackupHistory() {
    if (!importBackupHistory) return;
    const backups = readImportBackups();
    const { active, archived } = splitBackups(backups);
    renderBackupGroupFilterOptions(backups);
    renderBackupTagFilterOptions(backups);
    renderBackupTagStats(backups);
    renderBackupPolicyPreview(active);
    renderSelectedTagSummary();
    const filters = getBackupFilters();
    const filteredActive = filterBackups(active, filters);
    const filteredArchived = filterArchivedBackups(filterBackups(archived, filters), state.archivedBackupKeyword);
    renderArchivedStats(archived);

    if (!backups.length) {
      importBackupHistory.innerHTML = `<p class="backup-empty">还没有导入备份。导入一次后，这里会显示最近几次可回退的时间点。</p>`;
      if (archivedBackupHistory) archivedBackupHistory.innerHTML = `<p class="backup-empty">还没有归档备份。</p>`;
      renderBackupStats(backups, active, 0, archived.length);
      return;
    }
    if (!active.length) {
      importBackupHistory.innerHTML = `<p class="backup-empty">当前没有活动备份。你可以创建新备份，或从归档区取回一些备份。</p>`;
    } else if (!filteredActive.length) {
      importBackupHistory.innerHTML = `<p class="backup-empty">没有符合当前搜索或来源筛选的活动备份。</p>`;
    } else {
      const sortedActive = sortBackups(filteredActive, filters.sort);
      const pinnedActive = sortedActive.filter((backup) => backup?.pinned);
      const normalActive = sortedActive.filter((backup) => !backup?.pinned);
      importBackupHistory.innerHTML = `${renderPinnedBackupBlock(pinnedActive, backups, { archived: false, title: "置顶备份" })}${renderGroupedBackupList(normalActive, backups, { archived: false })}`;
    }

    if (!archivedBackupHistory) {
      renderBackupStats(backups, active, filteredActive.length + filteredArchived.length, archived.length);
      return;
    }
    if (!archived.length) {
      archivedBackupHistory.innerHTML = `<p class="backup-empty">还没有归档备份。归档后的备份会长期保留，并且不参与清理策略。</p>`;
    } else if (!filteredArchived.length) {
      archivedBackupHistory.innerHTML = `<p class="backup-empty">没有符合当前搜索或来源筛选的归档备份。</p>`;
    } else {
      const sortedArchived = sortBackups(filteredArchived, filters.sort);
      const pinnedArchived = sortedArchived.filter((backup) => backup?.pinned);
      const normalArchived = sortedArchived.filter((backup) => !backup?.pinned);
      archivedBackupHistory.innerHTML = `${renderPinnedBackupBlock(pinnedArchived, backups, { archived: true, title: "置顶归档" })}${renderGroupedBackupList(normalArchived, backups, { archived: true })}`;
    }
    renderBackupStats(backups, active, filteredActive.length + filteredArchived.length, archived.length);
  }

  function renderBackupStats(allBackups, activeBackups, filteredCount, archivedCount) {
    if (!backupStatsGrid) return;
    const importCount = activeBackups.filter((b) => (b?.source || "import") === "import").length;
    const snapshotCount = activeBackups.filter((b) => (b?.source || "import") === "snapshot").length;
    const pinnedCount = allBackups.filter((b) => Boolean(b?.pinned)).length;
    const selectedCount = Object.keys(state.selectedBackupIndexes).filter((key) => state.selectedBackupIndexes[key]).length;
    backupStatsGrid.innerHTML = `
      <div class="mini-stat">
        <span>总备份数</span>
        <strong>${allBackups.length}</strong>
      </div>
      <div class="mini-stat">
        <span>容量占用</span>
        <strong>${activeBackups.length}/${MAX_IMPORT_BACKUPS}</strong>
      </div>
      <div class="mini-stat">
        <span>导入前</span>
        <strong>${importCount}</strong>
      </div>
      <div class="mini-stat">
        <span>快照</span>
        <strong>${snapshotCount}</strong>
      </div>
      <div class="mini-stat">
        <span>已归档</span>
        <strong>${archivedCount}</strong>
      </div>
      <div class="mini-stat">
        <span>已置顶</span>
        <strong>${pinnedCount}</strong>
      </div>
      <div class="mini-stat">
        <span>当前筛选结果</span>
        <strong>${filteredCount}</strong>
      </div>
      <div class="mini-stat">
        <span>已选中</span>
        <strong>${selectedCount}</strong>
      </div>
    `;
    if (backupCapacityHint) {
      const policyText =
        settings.backupCleanupPolicy === "keep_annotated"
          ? "优先保留有备注/标签"
          : settings.backupCleanupPolicy === "balance_sources"
            ? "尽量平衡导入前与快照"
            : "优先保留最近备份";
      backupCapacityHint.textContent =
        activeBackups.length >= MAX_IMPORT_BACKUPS
          ? `备份已达到上限 ${MAX_IMPORT_BACKUPS} 条；当前策略为“${policyText}”，继续创建时会按该策略自动淘汰。`
          : `活动备份上限为 ${MAX_IMPORT_BACKUPS} 条；当前策略为“${policyText}”，还可新增 ${MAX_IMPORT_BACKUPS - activeBackups.length} 条。`;
    }
  }

  function getSelectedBackupIndexes() {
    return Object.keys(state.selectedBackupIndexes)
      .filter((key) => state.selectedBackupIndexes[key])
      .map((key) => Number(key))
      .filter((value) => Number.isFinite(value))
      .sort((a, b) => a - b);
  }

  function getSelectedArchivedBackupIndexes() {
    return Object.keys(state.selectedArchivedBackupIndexes)
      .filter((key) => state.selectedArchivedBackupIndexes[key])
      .map((key) => Number(key))
      .filter((value) => Number.isFinite(value))
      .sort((a, b) => a - b);
  }

  function parseBackupIndexList(value) {
    return String(value || "")
      .split(",")
      .map((part) => Number(part))
      .filter((num) => Number.isFinite(num))
      .sort((a, b) => a - b);
  }

  function syncAfterBackupRestore() {
    state.best = readBest();
    const restoredSettings = readSettings();
    settings.audioEnabled = restoredSettings.audioEnabled;
    settings.shakeEnabled = restoredSettings.shakeEnabled;
    settings.volume = restoredSettings.volume;
    syncSettingsUI();
    renderLeaderboard();
    renderProgressSummary();
    renderOnboardingChecklist();
    updateAnalyticsPanel();
    updateHud();
    renderImportBackupHistory();
  }

  function restoreImportBackupAtIndex(index) {
    const backups = readImportBackups();
    if (index < 0 || index >= backups.length) return false;
    const backup = backups[index];
    const storage = backup && backup.storage ? backup.storage : {};
    writeRawLocalStorage(LEADERBOARD_KEY, storage[LEADERBOARD_KEY] ?? null);
    writeRawLocalStorage(PROGRESS_KEY, storage[PROGRESS_KEY] ?? null);
    writeRawLocalStorage(ONBOARDING_KEY, storage[ONBOARDING_KEY] ?? null);
    writeRawLocalStorage(STORAGE_KEY, storage[STORAGE_KEY] ?? null);
    writeRawLocalStorage(SETTINGS_KEY, storage[SETTINGS_KEY] ?? null);

    // 恢复后，截断“未来”的备份点（该点之后的导入都不再适用）
    const remaining = backups.slice(0, index);
    writeImportBackups(remaining);

    // 重新同步运行态
    syncAfterBackupRestore();
    return true;
  }

  function restoreBackupModuleAtIndex(index, moduleKey) {
    const backups = readImportBackups();
    if (index < 0 || index >= backups.length) return false;
    const backup = backups[index];
    const storage = backup && backup.storage ? backup.storage : {};
    if (moduleKey === "leaderboard") {
      if (!storage[LEADERBOARD_KEY]) return false;
      writeRawLocalStorage(LEADERBOARD_KEY, storage[LEADERBOARD_KEY]);
    } else if (moduleKey === "progress") {
      if (!storage[PROGRESS_KEY]) return false;
      writeRawLocalStorage(PROGRESS_KEY, storage[PROGRESS_KEY]);
    } else if (moduleKey === "onboarding") {
      if (!storage[ONBOARDING_KEY]) return false;
      writeRawLocalStorage(ONBOARDING_KEY, storage[ONBOARDING_KEY]);
    } else if (moduleKey === "best") {
      if (storage[STORAGE_KEY] == null) return false;
      writeRawLocalStorage(STORAGE_KEY, storage[STORAGE_KEY]);
    } else if (moduleKey === "settings") {
      if (!storage[SETTINGS_KEY]) return false;
      writeRawLocalStorage(SETTINGS_KEY, storage[SETTINGS_KEY]);
    } else {
      return false;
    }

    syncAfterBackupRestore();
    return true;
  }

  function snapshotForImportSummary(selection) {
    const sel = selection || getImportSelection();
    const snap = {};
    if (sel.leaderboard) {
      snap.leaderboardCount = readLeaderboard().length;
    }
    if (sel.progress) {
      const p = readProgress();
      snap.totalRuns = p.totalRuns;
      snap.bestTier = p.bestTier;
      snap.totalScore = p.totalScore;
    }
    if (sel.onboarding) {
      const o = readOnboarding();
      snap.onboardingCompleted = countCompletedOnboarding(o);
      snap.onboardingAllDone = Boolean(o.all_done);
    }
    if (sel.best) {
      snap.best = readBest();
    }
    if (sel.settings) {
      snap.settings = { audioEnabled: settings.audioEnabled, shakeEnabled: settings.shakeEnabled, volume: settings.volume };
    }
    return snap;
  }

  function buildImportAfterSummary(before, after, selection, applied, skippedMissing) {
    const sel = selection || getImportSelection();
    const lines = [];
    lines.push("导入完成摘要：");
    if (skippedMissing.length) lines.push(`跳过（文件缺失）：${skippedMissing.join("、")}`);

    if (sel.leaderboard) {
      const mode = sel.mergeLeaderboard ? "合并" : "覆盖";
      lines.push(`排行榜：${mode}（${before.leaderboardCount ?? "-"} → ${after.leaderboardCount ?? "-"} 条）`);
    }
    if (sel.progress) {
      const mode = sel.mergeProgress ? "合并" : "覆盖";
      lines.push(`长期进度：${mode}`);
      lines.push(`长期进度：局数 ${before.totalRuns ?? "-"} → ${after.totalRuns ?? "-"}`);
      lines.push(`长期进度：最高等级 ${before.bestTier ?? "-"} → ${after.bestTier ?? "-"}`);
    }
    if (sel.onboarding) {
      const mode = sel.mergeOnboarding ? "合并" : "覆盖";
      lines.push(`引导进度：${mode}`);
      lines.push(`引导进度：${before.onboardingCompleted ?? "-"} → ${after.onboardingCompleted ?? "-"} / ${ONBOARDING_STEPS.length}`);
    }
    if (sel.best) {
      lines.push(`最高分：${before.best ?? "-"} → ${after.best ?? "-"}`);
    }
    if (sel.settings) {
      lines.push(`设置：音效 ${before.settings?.audioEnabled ? "开" : "关"} → ${after.settings?.audioEnabled ? "开" : "关"}`);
      lines.push(`设置：晃动 ${before.settings?.shakeEnabled ? "开" : "关"} → ${after.settings?.shakeEnabled ? "开" : "关"}`);
      const bv = before.settings?.volume ?? 0;
      const av = after.settings?.volume ?? 0;
      lines.push(`设置：音量 ${(bv * 100).toFixed(0)} → ${(av * 100).toFixed(0)}`);
    }
    return lines.join("\n");
  }

  function getBackupSelectionFromAvailability(backup) {
    const has = getBackupModuleAvailability(backup);
    return {
      leaderboard: has.leaderboard,
      progress: has.progress,
      onboarding: has.onboarding,
      best: has.best,
      settings: has.settings,
      mergeLeaderboard: false,
      mergeProgress: false,
      mergeOnboarding: false
    };
  }

  function buildBackupDiffPreviewForSelection(backup, selection) {
    if (!selection.leaderboard && !selection.progress && !selection.onboarding && !selection.best && !selection.settings) {
      return "差异预览：这条备份里没有可恢复的数据。";
    }
    const payload = buildPayloadFromBackup(backup);
    const current = snapshotForImportSummary(selection);
    const target = computeImportTargetSnapshot(payload, selection);
    const lines = [];
    lines.push("差异预览：");
    if (selection.leaderboard) {
      lines.push(`排行榜：${current.leaderboardCount ?? 0} → ${target.leaderboardCount ?? 0} 条`);
    }
    if (selection.progress) {
      const deltaRuns = (target.totalRuns ?? 0) - (current.totalRuns ?? 0);
      const deltaScore = (target.totalScore ?? 0) - (current.totalScore ?? 0);
      lines.push(`长期进度：局数 ${current.totalRuns ?? 0} → ${target.totalRuns ?? 0}（${deltaRuns >= 0 ? "+" : ""}${deltaRuns}）`);
      lines.push(`长期进度：总分 ${current.totalScore ?? 0} → ${target.totalScore ?? 0}（${deltaScore >= 0 ? "+" : ""}${deltaScore}）`);
      lines.push(`长期进度：最高等级 ${current.bestTier ?? 1} → ${target.bestTier ?? 1}`);
    }
    if (selection.onboarding) {
      const deltaGuide = (target.onboardingCompleted ?? 0) - (current.onboardingCompleted ?? 0);
      lines.push(`引导进度：${current.onboardingCompleted ?? 0} → ${target.onboardingCompleted ?? 0}/${ONBOARDING_STEPS.length}（${deltaGuide >= 0 ? "+" : ""}${deltaGuide}）`);
    }
    if (selection.best) {
      lines.push(`最高分：${current.best ?? 0} → ${target.best ?? 0}`);
    }
    if (selection.settings) {
      lines.push(`设置：音效 ${current.settings?.audioEnabled ? "开" : "关"} → ${target.settings?.audioEnabled ? "开" : "关"}`);
      lines.push(`设置：晃动 ${current.settings?.shakeEnabled ? "开" : "关"} → ${target.settings?.shakeEnabled ? "开" : "关"}`);
      lines.push(`设置：音量 ${((current.settings?.volume ?? 0) * 100).toFixed(0)} → ${((target.settings?.volume ?? 0) * 100).toFixed(0)}`);
    }
    return lines.join("\n");
  }

  function buildBackupDiffPreview(backup) {
    return buildBackupDiffPreviewForSelection(backup, getBackupSelectionFromAvailability(backup));
  }

  function buildBackupRestoreConfirmText(backup) {
    const diff = buildBackupDiffPreview(backup);
    return `确认恢复到该备份点吗？\n\n${diff}\n\n注意：恢复后，这条备份之后的活动备份会被清除。`;
  }

  function buildBackupModuleRestoreConfirmText(backup, moduleKey) {
    const selection = {
      leaderboard: moduleKey === "leaderboard",
      progress: moduleKey === "progress",
      onboarding: moduleKey === "onboarding",
      best: moduleKey === "best",
      settings: moduleKey === "settings",
      mergeLeaderboard: false,
      mergeProgress: false,
      mergeOnboarding: false
    };
    const moduleNameMap = {
      leaderboard: "排行榜",
      progress: "长期进度",
      onboarding: "引导进度",
      best: "最高分",
      settings: "设置"
    };
    return `确认只恢复“${moduleNameMap[moduleKey] || moduleKey}”吗？\n\n${buildBackupDiffPreviewForSelection(backup, selection)}\n\n这不会影响其他本地数据。`;
  }

  function computeImportTargetSnapshot(payload, selection) {
    const { data, has } = analyzeImportPayload(payload);
    const sel = selection || getImportSelection();
    const current = snapshotForImportSummary(sel);
    const target = { ...current };

    if (sel.leaderboard && has.leaderboard) {
      target.leaderboardCount = sel.mergeLeaderboard
        ? mergeLeaderboardEntries(readLeaderboard(), data.leaderboard, 5).length
        : data.leaderboard.length;
    }
    if (sel.progress && has.progress) {
      const mergedOrDirect = sel.mergeProgress ? mergeProgress(readProgress(), data.progress) : normalizeProgressData(data.progress);
      target.totalRuns = mergedOrDirect.totalRuns;
      target.bestTier = mergedOrDirect.bestTier;
      target.totalScore = mergedOrDirect.totalScore;
    }
    if (sel.onboarding && has.onboarding) {
      const mergedOrDirect = sel.mergeOnboarding ? mergeOnboarding(readOnboarding(), data.onboarding) : data.onboarding;
      target.onboardingCompleted = countCompletedOnboarding(mergedOrDirect);
      target.onboardingAllDone = Boolean(mergedOrDirect.all_done);
    }
    if (sel.best && has.best) {
      target.best = Number(data.best || 0);
    }
    if (sel.settings && has.settings) {
      target.settings = normalizeSettingsData(data.settings);
    }
    return target;
  }

  function buildImportDiffPreview(payload, selection) {
    const sel = selection || getImportSelection();
    const analysis = analyzeImportPayload(payload);
    const current = snapshotForImportSummary(sel);
    const target = computeImportTargetSnapshot(payload, sel);
    const lines = [];
    lines.push(buildImportSummary(payload));
    lines.push("");
    lines.push("差异预览：");

    if (sel.leaderboard) {
      const mode = sel.mergeLeaderboard ? "合并" : "覆盖";
      const importedCount = analysis.has.leaderboard ? analysis.data.leaderboard.length : 0;
      lines.push(`排行榜：${mode}，当前 ${current.leaderboardCount ?? 0} 条，文件 ${importedCount} 条，结果 ${target.leaderboardCount ?? 0} 条`);
    }
    if (sel.progress) {
      const mode = sel.mergeProgress ? "合并" : "覆盖";
      const deltaRuns = (target.totalRuns ?? 0) - (current.totalRuns ?? 0);
      lines.push(`长期进度：${mode}，累计局数 ${current.totalRuns ?? 0} → ${target.totalRuns ?? 0}（${deltaRuns >= 0 ? "+" : ""}${deltaRuns}）`);
      lines.push(`长期进度：最高等级 ${current.bestTier ?? 1} → ${target.bestTier ?? 1}`);
    }
    if (sel.onboarding) {
      const mode = sel.mergeOnboarding ? "合并" : "覆盖";
      const deltaGuide = (target.onboardingCompleted ?? 0) - (current.onboardingCompleted ?? 0);
      lines.push(`引导进度：${mode}，${current.onboardingCompleted ?? 0} → ${target.onboardingCompleted ?? 0} / ${ONBOARDING_STEPS.length}（${deltaGuide >= 0 ? "+" : ""}${deltaGuide}）`);
      if ((target.onboardingAllDone ?? false) && !(current.onboardingAllDone ?? false)) {
        lines.push("引导进度：这次导入后会直接达成完整引导");
      }
    }
    if (sel.best) {
      lines.push(`最高分：${current.best ?? 0} → ${target.best ?? 0}`);
    }
    if (sel.settings) {
      lines.push(`设置：音效 ${current.settings?.audioEnabled ? "开" : "关"} → ${target.settings?.audioEnabled ? "开" : "关"}`);
      lines.push(`设置：晃动 ${current.settings?.shakeEnabled ? "开" : "关"} → ${target.settings?.shakeEnabled ? "开" : "关"}`);
    }

    return lines.join("\n");
  }

  function renderImportPreview(text, isEmpty = false) {
    if (!importPreviewBox) return;
    importPreviewBox.textContent = text;
    importPreviewBox.classList.toggle("empty", isEmpty);
  }

  function applyImportPayload(payload, selection) {
    const { meta, data, has } = analyzeImportPayload(payload);
    const sel = selection || getImportSelection();
    if (meta.app && meta.app !== "blob-merge-prototype") {
      throw new Error("这不是啵啵星团原型的数据文件");
    }
    if (!sel.leaderboard && !sel.progress && !sel.onboarding && !sel.best && !sel.settings) {
      throw new Error("请至少选择一个导入项");
    }

    if (sel.leaderboard && has.leaderboard) {
      if (sel.mergeLeaderboard) {
        const merged = mergeLeaderboardEntries(readLeaderboard(), data.leaderboard, 5);
        writeLeaderboard(merged);
      } else {
        writeLeaderboard(data.leaderboard);
      }
    } else if (sel.leaderboard && data.leaderboard != null) {
      throw new Error("排行榜格式不正确");
    }

    if (sel.progress && has.progress) {
      if (sel.mergeProgress) {
        const merged = mergeProgress(readProgress(), data.progress);
        writeProgress(merged);
      } else {
        writeProgress(normalizeProgressData(data.progress));
      }
    } else if (sel.progress && data.progress != null) {
      throw new Error("长期进度格式不正确");
    }

    if (sel.onboarding && has.onboarding) {
      if (sel.mergeOnboarding) {
        writeOnboarding(mergeOnboarding(readOnboarding(), data.onboarding));
      } else {
        writeOnboarding(data.onboarding);
      }
    } else if (sel.onboarding && data.onboarding != null) {
      throw new Error("引导进度格式不正确");
    }

    if (sel.best && has.best) {
      const bestValue = Number(data.best || 0);
      writeBest(bestValue);
      state.best = bestValue;
    } else if (sel.best && data.best != null) {
      throw new Error("最高分格式不正确");
    }

    if (sel.settings && has.settings) {
      const importedSettings = normalizeSettingsData(data.settings);
      settings.audioEnabled = importedSettings.audioEnabled;
      settings.shakeEnabled = importedSettings.shakeEnabled;
      settings.volume = importedSettings.volume;
      saveSettings();
      syncSettingsUI();
    } else if (sel.settings && data.settings != null) {
      throw new Error("设置格式不正确");
    }

    renderLeaderboard();
    renderProgressSummary();
    renderOnboardingChecklist();
    updateAnalyticsPanel();
    updateHud();
  }

  function updateAnalyticsPanel() {
    if (!analyticsGuideProgress || !analyticsDropBias || !analyticsRecovery || !analyticsPressure || !analyticsTaskRate) {
      return;
    }
    const onboarding = readOnboarding();
    const completed = countCompletedOnboarding(onboarding);
    analyticsGuideProgress.textContent = `引导 ${completed}/${ONBOARDING_STEPS.length}`;
    analyticsTaskRate.textContent = `${completed}/${ONBOARDING_STEPS.length}`;
    analyticsDropBias.textContent = getDropBiasText();
    analyticsRecovery.textContent = `${state.recoveryCount} 次`;

    let pressure = "安全";
    if (state.overlineTime > 0) {
      pressure = `触线 ${Math.ceil(Math.max(0, OVERLINE_LIMIT - state.overlineTime))} 秒`;
    } else if (state.warningLevel > 0.58) {
      pressure = "高压";
    } else if (state.warningLevel > 0.22) {
      pressure = "接近危险";
    }
    analyticsPressure.textContent = pressure;
  }

  function resetLeaderboardData() {
    writeLeaderboard([]);
    renderLeaderboard();
  }

  function resetProgressData() {
    writeProgress({
      totalRuns: 0,
      totalScore: 0,
      totalMerges: 0,
      bestTier: 1,
      longestDurationSeconds: 0,
      unlockedMilestoneKeys: {}
    });
    renderProgressSummary();
  }

  function resetBestData() {
    writeBest(0);
    state.best = 0;
    updateHud();
  }

  function ensureAudio() {
    if (!settings.audioEnabled) return null;
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      audioCtx = new Ctx();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playTone({ frequency = 440, duration = 0.08, type = "sine", gain = 0.03 }) {
    const ctxx = ensureAudio();
    if (!ctxx) return;
    const oscillator = ctxx.createOscillator();
    const gainNode = ctxx.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.value = gain * settings.volume;
    oscillator.connect(gainNode);
    gainNode.connect(ctxx.destination);
    const now = ctxx.currentTime;
    gainNode.gain.setValueAtTime(gain * settings.volume, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  function stopBgm() {
    if (bgmIntervalId) {
      clearInterval(bgmIntervalId);
      bgmIntervalId = null;
    }
  }

  function playBgmStep() {
    const ctxx = ensureAudio();
    if (!ctxx || !settings.audioEnabled || !state.started || state.paused || state.gameOver) return;
    const note = BGM_SEQUENCE[bgmStep % BGM_SEQUENCE.length];
    bgmStep += 1;
    playTone({ frequency: note.bass, duration: 0.26, type: "triangle", gain: 0.012 });
    playTone({ frequency: note.lead, duration: 0.16, type: "sine", gain: 0.008 });
  }

  function syncBgm() {
    if (!settings.audioEnabled || !state.started || state.paused || state.gameOver) {
      stopBgm();
      return;
    }
    ensureAudio();
    if (bgmIntervalId) return;
    playBgmStep();
    bgmIntervalId = window.setInterval(playBgmStep, 320);
  }

  function formatDuration(seconds) {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  }

  function formatRunTimer(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  function getRunSeconds() {
    if (!state.runStartTime) return 0;
    return Math.max(0, Math.round((performance.now() - state.runStartTime) / 1000));
  }

  function unlockMilestone(key, title, description, popupColor = "#fef3c7") {
    if (state.milestoneKeys[key]) return;
    state.milestoneKeys[key] = true;
    state.milestonesUnlocked.push({ key, title, description });
    spawnPopup(WORLD.width / 2, 146, `达成：${title}`, popupColor);
    playTone({ frequency: 740, duration: 0.08, type: "triangle", gain: 0.03 });
  }

  function rewardObjectiveStep(key, title, tip, popupColor = "#bbf7d0") {
    if (state.taskRewardKeys[key]) return;
    state.taskRewardKeys[key] = true;
    spawnPopup(WORLD.width / 2, 178, `任务完成：${title}`, popupColor);
    state.cameraPunch = Math.max(state.cameraPunch, 0.03);
    setCoachMoment("任务完成", title, tip, 4.2);
    playTone({ frequency: 620, duration: 0.1, type: "triangle", gain: 0.035 });
  }

  function renderMilestones() {
    if (!resultMilestones) return;
    if (!state.milestonesUnlocked || state.milestonesUnlocked.length === 0) {
      resultMilestones.innerHTML = `<p class="milestone-empty">这局还没有解锁里程碑，下一局会更快进入节奏。</p>`;
      return;
    }
    resultMilestones.innerHTML = state.milestonesUnlocked
      .map(
        (m) => `
        <div class="milestone-item">
          <strong>${m.title}</strong>
          <small>${m.description}</small>
        </div>
      `
      )
      .join("");
  }

  function getCurrentTopTier() {
    let maxTier = state.maxLevelReached;
    for (const blob of state.blobs) {
      if (blob.level > maxTier) maxTier = blob.level;
    }
    return maxTier + 1;
  }

  function getReadyStatus() {
    return isMobileMode
      ? "准备开始：点击直接下落，也可以左右瞄准后滑动投放"
      : "准备开始：移动鼠标瞄准，点击或按 Space 投放";
  }

  function getPlayStatus() {
    return isMobileMode
      ? "继续：点击直接下落，也可以向下滑动投放"
      : "继续整理空间，别让它们顶到红线";
  }

  function openPanel(panel) {
    if (!panel || !panel.classList.contains("hidden")) return;
    panel.classList.remove("hidden");
    state.panelsOpen += 1;
    state.paused = true;
    if (panel === pausePanel && state.started && !state.gameOver) {
      const onboarding = readOnboarding();
      const firstPause = !onboarding.first_pause;
      completeOnboardingStep("first_pause");
      if (firstPause) {
        setCoachMoment("暂停提示", "暂停里可以回看当前任务", "不确定下一步时，先看暂停里的任务回看，比硬打更有帮助。", 4.2);
      }
    }
    stopBgm();
    updatePauseButton();
  }

  function closePanel(panel) {
    if (!panel || panel.classList.contains("hidden")) return;
    panel.classList.add("hidden");
    state.panelsOpen = Math.max(0, state.panelsOpen - 1);
    if (!state.gameOver && state.started && state.panelsOpen === 0) {
      state.paused = false;
      setStatus(getPlayStatus());
      syncBgm();
    } else if (!state.gameOver) {
      state.paused = true;
    }
    updatePauseButton();
  }

  function renderLeaderboard() {
    if (!leaderboardList) return;
    const entries = readLeaderboard();
    renderHistorySummary(entries);
    renderProgressSummary();
    if (entries.length === 0) {
      leaderboardList.innerHTML = `<li class="leaderboard-empty">还没有记录，先来打一局试试。</li>`;
      return;
    }
    leaderboardList.innerHTML = entries
      .map((entry, index) => `
        <li class="leaderboard-item">
          <span class="leaderboard-rank">#${index + 1}</span>
          <div class="leaderboard-meta">
            <strong>${entry.score}</strong>
            <small>最高等级 ${entry.tier} · ${entry.duration}</small>
          </div>
          <div class="leaderboard-score">
            <strong>${entry.date}</strong>
            <span>${entry.mode}</span>
          </div>
        </li>
      `)
      .join("");
  }

  function renderHistorySummary(entries) {
    if (!historyAvgDuration || !historyAvgMerges || !historyAvgDanger || !historyCommonFailure) {
      return;
    }
    if (!entries.length) {
      historyAvgDuration.textContent = "0s";
      historyAvgMerges.textContent = "0";
      historyAvgDanger.textContent = "0%";
      historyCommonFailure.textContent = "暂无";
      return;
    }

    const totalDuration = entries.reduce((sum, entry) => sum + Number(entry.durationSeconds || 0), 0);
    const totalMerges = entries.reduce((sum, entry) => sum + Number(entry.merges || 0), 0);
    const totalDanger = entries.reduce((sum, entry) => sum + Number(entry.peakDanger || 0), 0);

    const failureCount = new Map();
    for (const entry of entries) {
      const key = entry.failureType || "暂无";
      failureCount.set(key, (failureCount.get(key) || 0) + 1);
    }
    let commonFailure = "暂无";
    let commonCount = -1;
    for (const [key, count] of failureCount.entries()) {
      if (count > commonCount) {
        commonFailure = key;
        commonCount = count;
      }
    }

    historyAvgDuration.textContent = formatDuration(Math.round(totalDuration / entries.length));
    historyAvgMerges.textContent = String((totalMerges / entries.length).toFixed(1));
    historyAvgDanger.textContent = `${Math.round((totalDanger / entries.length) * 100)}%`;
    historyCommonFailure.textContent = commonFailure;
  }

  function renderProgressSummary() {
    if (
      !progressTotalRuns ||
      !progressTotalScore ||
      !progressTotalMerges ||
      !progressBestTier ||
      !progressLongestRun ||
      !progressMilestones
    ) {
      return;
    }

    const progress = readProgress();
    progressTotalRuns.textContent = String(progress.totalRuns);
    progressTotalScore.textContent = String(progress.totalScore);
    progressTotalMerges.textContent = String(progress.totalMerges);
    progressBestTier.textContent = String(progress.bestTier);
    progressLongestRun.textContent = formatDuration(progress.longestDurationSeconds);
    progressMilestones.textContent = String(Object.keys(progress.unlockedMilestoneKeys).length);
    renderProgressAchievements(progress);
  }

  function renderProgressAchievements(progress) {
    if (!progressAchievementList) return;
    const unlocked = progress.unlockedMilestoneKeys || {};
    const allKeys = Object.keys(MILESTONE_META);
    progressAchievementList.innerHTML = allKeys
      .map((key) => {
        const meta = MILESTONE_META[key];
        const isUnlocked = Boolean(unlocked[key]);
        return `
          <div class="achievement-item ${isUnlocked ? "unlocked" : "locked"}">
            <strong>${isUnlocked ? meta.title : `未解锁：${meta.title}`}</strong>
            <small>${isUnlocked ? meta.description : `解锁条件：${meta.requirement}`}</small>
          </div>
        `;
      })
      .join("");
  }

  function updateProgress(durationSeconds) {
    const progress = readProgress();
    progress.totalRuns += 1;
    progress.totalScore += state.score;
    progress.totalMerges += state.mergeCount;
    progress.bestTier = Math.max(progress.bestTier, getCurrentTopTier());
    progress.longestDurationSeconds = Math.max(progress.longestDurationSeconds, durationSeconds);
    for (const milestone of state.milestonesUnlocked) {
      progress.unlockedMilestoneKeys[milestone.key] = true;
    }
    writeProgress(progress);
  }

  function getFailureType() {
    if (state.overlineTime >= OVERLINE_LIMIT) {
      if (state.mergeCount <= 1 || (state.firstMergeAt > 0 && state.firstMergeAt >= 24)) {
        return "起手迟迟未合";
      }
      if (state.triggeredDangerCount >= 3 || state.recoveryCount >= 1) {
        return "危险反复拉扯";
      }
      if (state.centerDropCount >= Math.max(4, state.edgeDropCount * 1.8)) {
        return "中心堆叠过重";
      }
      if (state.maxLevelReached >= 4 && state.maxBlobsOnBoard >= 9) {
        return "高阶挤压失控";
      }
      return "危险处理过晚";
    }
    if (state.peakWarningLevel > 0.8) return "高压稳住";
    return "稳定推进";
  }

  function pushLeaderboardEntry() {
    const durationSeconds = Math.max(1, getRunSeconds());
    const entries = readLeaderboard();
    const failureType = getFailureType();
    state.failureType = failureType;
    entries.push({
      score: state.score,
      tier: getCurrentTopTier(),
      duration: formatDuration(durationSeconds),
      durationSeconds,
      date: new Date().toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" }),
      mode: isMobileMode ? "手机试玩" : "电脑试玩",
      merges: state.mergeCount,
      peakDanger: clamp(state.peakWarningLevel, 0, 1),
      failureType,
      maxBlobsOnBoard: state.maxBlobsOnBoard,
      triggeredDangerCount: state.triggeredDangerCount
    });
    entries.sort((a, b) => b.score - a.score || b.tier - a.tier);
    writeLeaderboard(entries.slice(0, 5));
    renderLeaderboard();
  }

  function syncSettingsUI() {
    if (audioToggle) audioToggle.checked = settings.audioEnabled;
    if (shakeToggle) shakeToggle.checked = settings.shakeEnabled;
    if (volumeRange) volumeRange.value = String(Math.round(settings.volume * 100));
    if (backupCleanupPolicy) backupCleanupPolicy.value = settings.backupCleanupPolicy;
  }

  function updatePauseButton() {
    if (!pauseBtn) return;
    pauseBtn.disabled = !state.started || state.gameOver;
    pauseBtn.textContent = state.paused && !state.gameOver ? "继续" : "暂停";
  }

  function updateDangerUI() {
    if (!dangerMeter || !dangerFill) return;

    let meterState = "safe";
    let ratio = 0;
    let text = "开始后会在这里显示危险状态";

    if (state.gameOver) {
      meterState = "critical";
      ratio = 1;
      text = "本局已结束";
    } else if (!state.started) {
      text = "开始后会在这里显示危险状态";
    } else if (state.overlineTime > 0) {
      meterState = "critical";
      ratio = clamp(state.overlineTime / OVERLINE_LIMIT, 0, 1);
      text = `已触线，剩余 ${Math.ceil(OVERLINE_LIMIT - state.overlineTime)} 秒`;
    } else if (state.warningLevel > 0.15) {
      meterState = "warning";
      ratio = clamp(state.warningLevel * 0.82, 0, 1);
      text = state.warningLevel > 0.58 ? "接近红线，优先清理上层" : "正在接近危险区";
    } else {
      ratio = clamp(state.warningLevel * 0.45, 0, 0.24);
      text = "当前安全，可以继续铺底";
    }

    dangerMeter.dataset.state = meterState;
    if (dangerText) {
      dangerText.textContent = text;
    }
    dangerFill.style.width = `${(ratio * 100).toFixed(1)}%`;
  }

  function setCoachMoment(stage, title, tip, duration = 4.5) {
    state.tutorialStage = stage;
    state.tutorialTitle = title;
    state.tutorialTip = tip;
    state.tutorialTimer = Math.max(state.tutorialTimer, duration);
    updateCoachUI();
  }

  function getCoachRecommendation() {
    if (!state.started) {
      return {
        stage: "准备开始",
        title: "先开局，再看局内建议",
        tip: isMobileMode
          ? "开局后先做几手轻投放，把底部铺稳，再开始追连续合并。"
          : "开局后先把前几只铺开，不要一上来就往中间最高点硬压。"
      };
    }

    if (state.overlineTime > 0) {
      return {
        stage: "极危",
        title: "先保命，立刻清理最上层",
        tip: "倒计时已经开始，优先把最接近红线的堆叠打散，再考虑继续追高阶。"
      };
    }

    if (state.warningLevel > 0.52) {
      return {
        stage: "危险区",
        title: "上层太高，先横向疏散",
        tip: "别再往中心最高点继续压了，优先把落点放到两侧，给中间腾出呼吸空间。"
      };
    }

    if (state.mergeCount === 0) {
      return {
        stage: "起手铺底",
        title: "先做出第一次合并",
        tip: "前几手的目标不是冲高，而是让同级啵啵体有机会在底部自然碰到一起。"
      };
    }

    if (state.blobs.length <= 4) {
      return {
        stage: "铺底阶段",
        title: "底部还很空，继续铺稳",
        tip: "让落点分散一点，后面你会更容易整理出连续合并的位置。"
      };
    }

    if (state.maxLevelReached <= 2) {
      return {
        stage: "追首个升级",
        title: "围绕最近的同级球继续做链式合并",
        tip: "优先投向最近能接触的同级目标，不要让新球白白卡在高点上。"
      };
    }

    if (state.maxLevelReached >= 4 && state.blobs.length >= 9) {
      return {
        stage: "中盘整理",
        title: "空间开始变紧，落点要更克制",
        tip: "大块头已经开始占位置，先解决快顶线的区域，再考虑继续抬层级。"
      };
    }

    if (state.blobs.length >= 12) {
      return {
        stage: "拥挤局面",
        title: "优先清中心上层，别把节奏打乱",
        tip: "先让最高处降下来，再追更高阶，会比盲目追合更稳。"
      };
    }

    return {
      stage: "稳定推进",
      title: "继续做相邻同级合并",
      tip: "保持底部有承接面，下一只优先投向最容易形成连锁的位置。"
    };
  }

  function updateCoachUI() {
    if (!coachStage || !coachTitle || !coachTip) return;
    const hasMoment = state.tutorialTimer > 0 && state.tutorialTitle;
    const data = hasMoment
      ? {
          stage: state.tutorialStage,
          title: state.tutorialTitle,
          tip: state.tutorialTip
        }
      : getCoachRecommendation();

    coachStage.textContent = data.stage;
    coachTitle.textContent = data.title;
    coachTip.textContent = data.tip;
  }

  function getDropBiasText() {
    return `中路 ${state.centerDropCount} : 边路 ${state.edgeDropCount}`;
  }

  function getObjectiveData() {
    const runSeconds = getRunSeconds();

    if (state.overlineTime > 0) {
      const remain = Math.max(0, OVERLINE_LIMIT - state.overlineTime);
      return {
        stage: "紧急目标",
        title: "把局势拉回红线下方",
        ratio: clamp(1 - state.overlineTime / OVERLINE_LIMIT, 0, 1),
        value: `剩余 ${Math.ceil(remain)} 秒`,
        tip: "先保命，优先打散最上层堆叠，别继续贪更高阶。"
      };
    }

    if (state.warningLevel > 0.42) {
      return {
        stage: "插入任务",
        title: "把最高处降回安全区",
        ratio: clamp(1 - state.warningLevel, 0, 1),
        value: `${Math.round((1 - clamp(state.warningLevel, 0, 1)) * 100)}%`,
        tip: "优先把球落向两侧，别继续把中心最高点越堆越高。"
      };
    }

    if (
      state.dropCount >= 3 &&
      state.mergeCount === 0 &&
      state.centerDropCount >= Math.max(2, state.edgeDropCount + 1)
    ) {
      return {
        stage: "纠偏任务",
        title: "下一手别再压中路",
        ratio: 0.3,
        value: getDropBiasText(),
        tip: "你前几手明显更偏中路，底部还没铺开。下一手优先落边路，给第一次合并腾空间。"
      };
    }

    if (state.firstWarningAt > 0 && state.mergeCount < 3) {
      return {
        stage: "稳局任务",
        title: "先把高点拆开，再追第三次合并",
        ratio: clamp(state.mergeCount / 3, 0, 0.7),
        value: `${state.mergeCount}/3`,
        tip: "危险来得比合并更早，说明这局空间利用不够好。先救空间，再继续追连锁。"
      };
    }

    if (state.recoveryCount >= 1 && state.warningLevel > 0.12) {
      return {
        stage: "恢复任务",
        title: "刚救回来，先稳两手再抬高度",
        ratio: clamp(1 - state.warningLevel * 1.1, 0, 1),
        value: `已救回 ${state.recoveryCount} 次`,
        tip: "这局已经从危险区拉回来过，接下来别立刻再追高，先用两手把局势压平。"
      };
    }

    if (state.dropCount < 1) {
      return {
        stage: "阶段 1/5",
        title: "完成第一投",
        ratio: 0,
        value: "0/1",
        tip: "先把第一只放出去，开局重点是找到舒服的落点和回弹感觉。"
      };
    }

    if (state.mergeCount < 1) {
      if (state.dropCount >= 5) {
        return {
          stage: "补节奏任务",
          title: "第一次合并来得太晚了",
          ratio: 0.78,
          value: `${state.dropCount} 手未合`,
          tip: "这局起手已经拖慢了。下一手优先贴近最近的同级球，先把第一合做出来。"
        };
      }
      return {
        stage: "阶段 2/5",
        title: "做出第一次合并",
        ratio: clamp(state.dropCount / 4, 0, 0.8),
        value: `${state.mergeCount}/1`,
        tip: "前几手先铺底，让同级球能在底部自然碰到一起。"
      };
    }

    if (state.mergeCount < 3) {
      if (state.firstMergeAt > 0 && state.firstMergeAt >= 18) {
        return {
          stage: "补速任务",
          title: "第一次合并偏晚，连锁要加快",
          ratio: clamp(state.mergeCount / 3, 0, 0.75),
          value: `${state.mergeCount}/3`,
          tip: "已经做出第一合，但节奏还是偏慢。接下来两手优先贴最近的同级目标，不要空投高点。"
        };
      }
      return {
        stage: "阶段 3/5",
        title: "累计做出 3 次合并",
        ratio: clamp(state.mergeCount / 3, 0, 1),
        value: `${state.mergeCount}/3`,
        tip: "围绕最近的同级球继续追第二次、第三次合并，不要急着把局面堆尖。"
      };
    }

    if (state.maxLevelReached < 4) {
      if (state.maxBlobsOnBoard >= 10) {
        return {
          stage: "中盘预热",
          title: "场上已经变挤，先留出凝胶兽的落点",
          ratio: clamp((state.maxLevelReached + 1) / 5, 0, 1),
          value: `场上 ${state.maxBlobsOnBoard} 只`,
          tip: "如果继续只往高处堆，合出大体型后会更难挪。先把边路留出来，再追下一阶。"
        };
      }
      return {
        stage: "阶段 4/5",
        title: "合出第一只凝胶兽",
        ratio: clamp((state.maxLevelReached + 1) / 5, 0, 1),
        value: `当前 ${LEVELS[Math.max(0, state.maxLevelReached)].name}`,
        tip: "现在比拼的是落点质量，稳定比盲目追高更重要。"
      };
    }

    if (runSeconds < 45) {
      if (state.centerDropCount >= Math.max(5, state.edgeDropCount * 1.6)) {
        return {
          stage: "稳局修正",
          title: "后半段开始多往两侧送球",
          ratio: clamp(runSeconds / 45, 0, 1),
          value: getDropBiasText(),
          tip: "你这局中路占用还是偏高。只要后半段更愿意放边路，危险峰值通常会明显下降。"
        };
      }
      return {
        stage: "阶段 5/5",
        title: "把局势稳住 45 秒",
        ratio: clamp(runSeconds / 45, 0, 1),
        value: `${runSeconds}s / 45s`,
        tip: "中盘先管空间，再管分数，只要别急着压高就会更稳。"
      };
    }

    return {
      stage: "阶段完成",
      title: "继续刷新本局最高层级",
      ratio: 1,
      value: `${state.score} 分`,
      tip: "已经进入稳定推进阶段，优先清理危险区附近，再寻找更高阶合并机会。"
    };
  }

  function updateObjectiveUI() {
    if (!objectiveStage || !objectiveTitle || !objectiveFill || !objectiveValue || !objectiveTip) {
      return;
    }
    const data = getObjectiveData();
    objectiveStage.textContent = data.stage;
    objectiveTitle.textContent = data.title;
    objectiveFill.style.width = `${(clamp(data.ratio, 0, 1) * 100).toFixed(1)}%`;
    objectiveValue.textContent = data.value;
    objectiveTip.textContent = data.tip;
    renderPauseObjectiveSnapshot(data);
    updateAnalyticsPanel();
  }

  function renderPauseObjectiveSnapshot(data) {
    if (!pauseObjectiveStage || !pauseObjectiveTitle || !pauseObjectiveFill || !pauseObjectiveValue || !pauseObjectiveTip) {
      return;
    }
    pauseObjectiveStage.textContent = data.stage;
    pauseObjectiveTitle.textContent = data.title;
    pauseObjectiveFill.style.width = `${(clamp(data.ratio, 0, 1) * 100).toFixed(1)}%`;
    pauseObjectiveValue.textContent = data.value;
    pauseObjectiveTip.textContent = data.tip;
  }

  function renderResultObjectiveSnapshot(data) {
    if (!resultObjectiveStage || !resultObjectiveTitle || !resultObjectiveValue || !resultObjectiveTip) {
      return;
    }
    resultObjectiveStage.textContent = data.stage;
    resultObjectiveTitle.textContent = data.title;
    resultObjectiveValue.textContent = data.value;
    resultObjectiveTip.textContent = data.tip;
  }

  function getResultObjectiveSnapshotData(baseData) {
    const failureType = state.failureType || getFailureType();
    if (failureType === "中心堆叠过重") {
      return {
        stage: "终局回看",
        title: "这局主要卡在中路过重",
        value: getDropBiasText(),
        tip: "从暂停到结算都可以优先记住这一点：下次别一直把球压在中轴，边路要更早利用起来。"
      };
    }
    if (failureType === "起手迟迟未合") {
      return {
        stage: "终局回看",
        title: "这局主要卡在第一次合并太晚",
        value: state.firstMergeAt > 0 ? `${state.firstMergeAt}s 才首合` : "未及时首合",
        tip: "下次前几手别急着堆高度，优先让最近的同级球更快碰到一起。"
      };
    }
    if (failureType === "危险反复拉扯") {
      return {
        stage: "终局回看",
        title: "这局卡在反复救险后又继续追高",
        value: `救回 ${state.recoveryCount} 次`,
        tip: "只要刚从危险区回来，就先用两手稳局，不要立刻继续抬高度。"
      };
    }
    if (failureType === "高阶挤压失控") {
      return {
        stage: "终局回看",
        title: "这局卡在高阶体型挤满操作空间",
        value: `场上最多 ${state.maxBlobsOnBoard} 只`,
        tip: "高阶局不是只追更大球，更重要的是提前给大球留边路和缓冲区。"
      };
    }
    return baseData;
  }

  function updateObjectiveRewards() {
    if (!state.started || state.gameOver) return;
    const runSeconds = getRunSeconds();
    if (state.dropCount >= 1) {
      rewardObjectiveStep("task_first_drop", "阶段 1 完成", "第一投已经完成，接下来重点是尽快做出第一次合并。", "#c7d2fe");
    }
    if (state.mergeCount >= 1) {
      rewardObjectiveStep("task_first_merge", "阶段 2 完成", "第一次合并已经做出来了，继续围绕同级球追第二次、第三次合并。", "#fde68a");
    }
    if (state.mergeCount >= 3) {
      rewardObjectiveStep("task_three_merges", "阶段 3 完成", "已经进入连锁节奏，下一步目标是合出第一只凝胶兽。", "#bae6fd");
    }
    if (state.maxLevelReached >= 4) {
      rewardObjectiveStep("task_reach_gel", "阶段 4 完成", "你已经进入中盘，接下来重点是把局势稳住而不是只顾着继续抬高。", "#e9d5ff");
    }
    if (runSeconds >= 45) {
      rewardObjectiveStep("task_survive_45", "阶段 5 完成", "这局已经完成完整任务链，可以开始专注冲分和冲更高等级了。", "#bbf7d0");
    }
  }

  function getResultReviewData(durationSeconds) {
    const failureType = state.failureType || getFailureType();
    const tags = [
      `投放 ${state.dropCount} 次`,
      `合并 ${state.mergeCount} 次`,
      `最高等级 ${getCurrentTopTier()}`,
      `峰值危险 ${Math.round(clamp(state.peakWarningLevel, 0, 1) * 100)}%`,
      `场上最多 ${state.maxBlobsOnBoard} 只`,
      `触线 ${state.triggeredDangerCount} 次`,
      `结局 ${failureType}`
    ];

    if (state.overlineTime >= OVERLINE_LIMIT) {
      if (failureType === "起手迟迟未合") {
        return {
          title: "前期节奏卡住了",
          tip: "这局的问题不只是堆高，而是第一次合并来得太晚。下一局前几手先铺底，让第一次合并更早发生。",
          tags
        };
      }
      if (failureType === "中心堆叠过重") {
        return {
          title: "中心被你自己越压越高了",
          tip: "这局很多投放都落在中轴附近，导致最高点越来越尖。下一局多往两侧送球，让中心有呼吸空间。",
          tags
        };
      }
      if (failureType === "危险反复拉扯") {
        return {
          title: "你其实救回来过，但没彻底稳住",
          tip: "这局不是单次失误，而是多次进入危险又反复拉扯。下一局一旦退回安全区，就先稳局，不要立刻再追高。",
          tags
        };
      }
      if (failureType === "高阶挤压失控") {
        return {
          title: "高阶大块头把局面锁死了",
          tip: "你已经打到更后面，但大体型啵啵体把操作空间吃掉了。下一局中盘要更早给大球留边路。",
          tags
        };
      }
      return {
        title: "危险线处理还是慢了半拍",
        tip: "这局翻车点更像是发现危险后处理不够早。只要在危险条刚发黄时就开始清最高层，容错会高很多。",
        tags
      };
    }

    if (state.recordBeaten || state.score >= state.best) {
      return {
        title: "这一局已经打出新纪录了",
        tip: "整体节奏是对的，后面可以继续围绕中盘空间管理和更高阶合并去冲更高分。",
        tags
      };
    }

    if (durationSeconds >= 60 && state.mergeCount >= 4) {
      return {
        title: "整体已经比较稳了",
        tip: "这局说明单人基础循环已经跑起来了。下一步重点可以继续优化中盘整理和连续合并节奏。",
        tags
      };
    }

    return {
      title: "节奏已经有了，再稳一点会更好",
      tip: "起手和中盘都已经能跑起来，接下来重点是更早处理高处堆叠，避免被危险线突然接管节奏。",
      tags
    };
  }

  function renderResultReview(durationSeconds) {
    if (!resultReviewTitle || !resultReviewTip || !resultReviewTags) return;
    const review = getResultReviewData(durationSeconds);
    resultReviewTitle.textContent = review.title;
    resultReviewTip.textContent = review.tip;
    resultReviewTags.innerHTML = review.tags
      .map((tag) => `<span class="result-tag">${tag}</span>`)
      .join("");
  }

  function startRun() {
    if (state.gameOver) return;
    ensureMotionControls();
    state.started = true;
    state.paused = false;
    state.runStartTime = performance.now();
    closePanel(helpPanel);
    closePanel(startPanel);
    closePanel(pausePanel);
    updatePauseButton();
    updateDangerUI();
    updateObjectiveUI();
    setCoachMoment(
      "开局提示",
      isMobileMode ? "先做第一手轻下滑" : "先投第一只，别急着压中间",
      isMobileMode
        ? "第一手先以轻一点的力度试试，感受当前这版的落点和回弹。"
        : "第一手尽量别直接压中心高点，先把底部接触面铺出来。"
    );
    setStatus(getPlayStatus());
    ensureAudio();
    bgmStep = 0;
    syncBgm();
  }

  function getBlobMass(blob) {
    return Math.max(0.8, blob.r * blob.r * 0.012);
  }

  function getBlobGravity(blob) {
    return BASE_GRAVITY * (0.78 + blob.level * 0.055);
  }

  function getBlobMaxFallSpeed(blob) {
    return MAX_FALL_SPEED_BASE * (0.92 + blob.level * 0.048);
  }

  function getScreenAngle() {
    if (typeof screen !== "undefined" && screen.orientation && typeof screen.orientation.angle === "number") {
      return screen.orientation.angle;
    }
    if (typeof window.orientation === "number") {
      return window.orientation;
    }
    return 0;
  }

  function handleDeviceOrientation(event) {
    if (!isMobileMode) return;
    const angle = ((getScreenAngle() % 360) + 360) % 360;
    const beta = Number.isFinite(event.beta) ? event.beta : 0;
    const gamma = Number.isFinite(event.gamma) ? event.gamma : 0;

    let rawTiltX = gamma;
    if (angle === 90) {
      rawTiltX = beta;
    } else if (angle === 270) {
      rawTiltX = -beta;
    } else if (angle === 180) {
      rawTiltX = -gamma;
    }

    state.tiltTargetX = clamp(rawTiltX / TILT_MAX_DEG, -1, 1);
  }

  function attachMotionListener() {
    if (state.motionListenerAttached || !isMobileMode || typeof window === "undefined") return;
    window.addEventListener("deviceorientation", handleDeviceOrientation, true);
    state.motionListenerAttached = true;
    state.motionReady = true;
  }

  function ensureMotionControls() {
    if (!isMobileMode || state.motionReady || state.motionPermissionAsked) return;
    state.motionPermissionAsked = true;

    const motionEvent = typeof DeviceOrientationEvent !== "undefined" ? DeviceOrientationEvent : null;
    if (motionEvent && typeof motionEvent.requestPermission === "function") {
      motionEvent
        .requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            attachMotionListener();
          }
        })
        .catch(() => {});
      return;
    }

    attachMotionListener();
  }

  function drawRoundedRect(x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function updateHud() {
    scoreValue.textContent = String(state.score);
    bestValue.textContent = String(state.best);
    if (timerValue) {
      timerValue.textContent = formatRunTimer(getRunSeconds());
    }

    const level = LEVELS[state.nextLevel];
    nextName.textContent = level.name;
    if (nextHint) {
      nextHint.textContent = level.hint;
    }
    nextBlob.style.background = `radial-gradient(circle at 28% 28%, rgba(255,255,255,0.95), rgba(255,255,255,0) 24%), ${level.color}`;
  }

  function setStatus(text) {
    statusBanner.textContent = text;
  }

  function resetGame(options = {}) {
    const { showStartPanel = true } = options;
    state.blobs = [];
    state.popups = [];
    state.bursts = [];
    state.sparks = [];
    state.pointerX = PIT.x + PIT.width / 2;
    state.pointerActive = false;
    state.nextLevel = weightedRandomLevel();
    state.score = 0;
    state.started = false;
    state.dropCount = 0;
    state.mergeCount = 0;
    state.centerDropCount = 0;
    state.edgeDropCount = 0;
    state.firstMergeAt = 0;
    state.firstWarningAt = 0;
    state.recoveryCount = 0;
    state.peakWarningLevel = 0;
    state.maxBlobsOnBoard = 0;
    state.triggeredDangerCount = 0;
    state.warningLevel = 0;
    state.overlineTime = 0;
    state.dropCooldown = 0;
    state.gameOver = false;
    state.paused = true;
    state.maxLevelReached = 0;
    state.recordBeaten = false;
    state.runStartTime = 0;
    state.cameraPunch = 0;
    state.time = 0;
    state.accumulator = 0;
    state.panelsOpen = 0;
    state.keyboardDir = 0;
    state.lastTs = 0;
    state.tutorialStage = "";
    state.tutorialTitle = "";
    state.tutorialTip = "";
    state.tutorialTimer = 0;
    state.warningHintShown = false;
    state.midgameHintShown = false;
    state.tiltTargetX = 0;
    state.tiltX = 0;
    state.milestonesUnlocked = [];
    state.milestoneKeys = {};
    state.everInOverline = false;
    state.failureType = "";
    state.taskRewardKeys = {};
    state.lastObjectiveSnapshot = null;
    closePanel(startPanel);
    closePanel(pausePanel);
    closePanel(resultPanel);
    closePanel(leaderboardPanel);
    closePanel(helpPanel);
    closePanel(settingsPanel);
    if (showStartPanel) {
      openPanel(startPanel);
    }
    updatePauseButton();
    setStatus(showStartPanel ? getReadyStatus() : "新的一局已准备好，直接开始吧");
    stopBgm();
    updateDangerUI();
    updateHud();
    updateCoachUI();
    updateObjectiveUI();
    renderOnboardingChecklist();
    updateAnalyticsPanel();
  }

  function quickRestartRun() {
    resetGame({ showStartPanel: false });
    startRun();
  }

  function createBlob(level, x, y, vx = 0, vy = 0) {
    return {
      id: state.idSeed++,
      level,
      x,
      y,
      vx,
      vy,
      r: LEVELS[level].radius,
      age: 0,
      mood: FACE_MOODS[Math.floor(Math.random() * FACE_MOODS.length)],
      blinkOffset: Math.random() * Math.PI * 2,
      blinkTimer: 0,
      blinkCooldown: 1.2 + Math.random() * 2.8,
      pulse: Math.random() * Math.PI * 2,
      nodPhase: Math.random() * Math.PI * 2,
      settledTime: 0,
      expression: "idle",
      expressionTimer: 0,
      smileSeed: Math.random() * Math.PI * 2
    };
  }

  function setBlobExpression(blob, expression, duration) {
    if (!blob) return;
    blob.expression = expression;
    blob.expressionTimer = Math.max(blob.expressionTimer, duration);
  }

  function spawnPopup(x, y, text, color = "#fff7ed") {
    state.popups.push({ x, y, text, color, life: 0.9 });
  }

  function spawnBurst(x, y, color, scale = 1, label = "") {
    state.bursts.push({
      x,
      y,
      color,
      life: 0.65 + scale * 0.08,
      radius: 24 + scale * 14,
      scale,
      label
    });
  }

  function spawnSparks(x, y, color, count, speedBase, lifeBase) {
    const n = Math.max(6, Math.floor(count));
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.35;
      const s = speedBase * (0.6 + Math.random() * 0.9);
      state.sparks.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - s * 0.08,
        r: 1.6 + Math.random() * 2.2,
        life: lifeBase * (0.75 + Math.random() * 0.6),
        color
      });
    }
  }

  function applyMergeShockwave(x, y, mergedRadius, sourceIds = []) {
    const shockRange = mergedRadius * 2.4 + 38;
    for (const blob of state.blobs) {
      if (sourceIds.includes(blob.id)) {
        continue;
      }
      const dx = blob.x - x;
      const dy = blob.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
      if (dist > shockRange) {
        continue;
      }
      const power = (1 - dist / shockRange) * (mergedRadius * 2.1);
      const nx = dx / dist;
      const ny = dy / dist;
      blob.vx += nx * power * 3.2;
      blob.vy += ny * power * 1.4 - power * 0.18;
    }
  }

  function dropBlob(releasePower = 0.25) {
    if (!state.started || state.gameOver || state.paused || state.dropCooldown > 0) {
      return;
    }

    const x = clamp(state.pointerX, PIT.x + 26, PIT.x + PIT.width - 26);
    const power = clamp(releasePower, 0.08, 1);
    const initialVy = -130 + power * 520;
    const initialVx = (Math.random() - 0.5) * 6;
    const blob = createBlob(state.nextLevel, x, SPAWN_Y, initialVx, initialVy);
    state.blobs.push(blob);
    state.dropCount += 1;
    completeOnboardingStep("first_drop");
    const centerMin = PIT.x + PIT.width * 0.32;
    const centerMax = PIT.x + PIT.width * 0.68;
    if (x >= centerMin && x <= centerMax) {
      state.centerDropCount += 1;
    } else {
      state.edgeDropCount += 1;
    }
    if (state.dropCount === 1) {
      unlockMilestone("first_drop", "第一投", "开局第一只已经落下，开始进入节奏。", "#c7d2fe");
    }
    state.nextLevel = weightedRandomLevel();
    state.dropCooldown = DROP_COOLDOWN;
    updateHud();
    if (state.dropCount === 1) {
      setCoachMoment(
        "第一步完成",
        "第一只已经落下，继续给底部铺承接面",
        "接下来两三手尽量别把球都堆在正中间，先让同级球有接触空间。"
      );
    } else if (state.dropCount === 3 && state.mergeCount === 0) {
      setCoachMoment(
        "继续铺底",
        "还没合并前，先别把局面堆尖",
        "如果一直往最高点压，后面会更难做第一次合并。"
      );
    }
    playTone({ frequency: 380 + power * 120, duration: 0.06, type: "triangle", gain: 0.025 });
    if (isMobileMode) {
      setStatus(power < 0.32 ? "轻轻一滑，像泡泡一样落下去" : power > 0.72 ? "这一手有点猛，落得更重了" : "力度适中，继续整理空间");
    } else {
      setStatus("啵！继续整理空间，别让它们顶到危险线");
    }
  }

  function handleGameOver() {
    const finalObjectiveSnapshot = getObjectiveData();
    completeOnboardingStep("first_gameover");
    state.gameOver = true;
    state.started = false;
    state.paused = true;
    stopBgm();
    state.lastObjectiveSnapshot = getResultObjectiveSnapshotData(finalObjectiveSnapshot);
    state.tutorialStage = "本局结束";
    state.tutorialTitle = "可以回看局面，再开下一局";
    state.tutorialTip = "如果是被顶线打断，下一局可以更早处理高处堆叠，不要一直往中心最高点加压。";
    state.tutorialTimer = 999;
    if (gamePanel) {
      gamePanel.style.transform = "";
    }
    if (state.score > state.best) {
      state.best = state.score;
      writeBest(state.best);
      spawnPopup(WORLD.width / 2, 126, "新纪录！", "#fde68a");
    }
    const durationSeconds = Math.max(1, getRunSeconds());
    pushLeaderboardEntry();
    updateProgress(durationSeconds);
    renderProgressSummary();
    if (resultTitle) resultTitle.textContent = state.score >= state.best ? "新纪录！" : "这局翻车了";
    if (resultScore) resultScore.textContent = String(state.score);
    if (resultBest) resultBest.textContent = String(state.best);
    if (resultTier) resultTier.textContent = String(getCurrentTopTier());
    if (resultDuration) {
      resultDuration.textContent = formatDuration(durationSeconds);
      renderResultReview(durationSeconds);
    }
    renderResultObjectiveSnapshot(state.lastObjectiveSnapshot);
    if (resultMerges) resultMerges.textContent = String(state.mergeCount);
    if (resultDangerPeak) {
      resultDangerPeak.textContent = `${Math.round(clamp(state.peakWarningLevel, 0, 1) * 100)}%`;
    }
    renderMilestones();
    renderOnboardingChecklist();
    updateHud();
    updateDangerUI();
    updateCoachUI();
    updateObjectiveUI();
    updateObjectiveRewards();
    setStatus("这一局结束了，点“重新开始”再来一次");
    playTone({ frequency: 220, duration: 0.16, type: "sawtooth", gain: 0.03 });
    setTimeout(() => openPanel(resultPanel), 180);
  }

  function updatePhysics(dt) {
    state.dropCooldown = Math.max(0, state.dropCooldown - dt);
    state.time += dt;
    state.tutorialTimer = Math.max(0, state.tutorialTimer - dt);
    state.maxBlobsOnBoard = Math.max(state.maxBlobsOnBoard, state.blobs.length);
    state.tiltX += (state.tiltTargetX - state.tiltX) * Math.min(1, dt * TILT_SMOOTH);
    const runSeconds = getRunSeconds();
    if (runSeconds >= 60) {
      unlockMilestone("survive_60s", "稳住 60 秒", "这局已经能把节奏稳住 1 分钟以上了。", "#a7f3d0");
    }

    if (state.keyboardDir !== 0 && !state.gameOver) {
      state.pointerX = clamp(
        state.pointerX + state.keyboardDir * 220 * dt,
        PIT.x + 20,
        PIT.x + PIT.width - 20
      );
    }

    for (const blob of state.blobs) {
      blob.age += dt;
      blob.pulse += dt * 6;
      blob.expressionTimer = Math.max(0, blob.expressionTimer - dt);
      if (blob.expressionTimer <= 0) {
        blob.expression = "idle";
      }
      if (isMobileMode && state.motionReady) {
        const tiltFactor = 0.88 + blob.level * 0.035;
        blob.vx += state.tiltX * TILT_ACCEL_X * dt * tiltFactor;
      }
      blob.vy = Math.min(blob.vy + getBlobGravity(blob) * dt, getBlobMaxFallSpeed(blob));
      blob.x += blob.vx * dt;
      blob.y += blob.vy * dt;
      blob.vx *= 0.99976;
      blob.vy *= 0.99986;

      if (blob.x - blob.r < PIT.x) {
        blob.x = PIT.x + blob.r;
        blob.vx = Math.abs(blob.vx) * WALL_BOUNCE;
      }
      if (blob.x + blob.r > PIT.x + PIT.width) {
        blob.x = PIT.x + PIT.width - blob.r;
        blob.vx = -Math.abs(blob.vx) * WALL_BOUNCE;
      }
      if (blob.y + blob.r > FLOOR_Y) {
        blob.y = FLOOR_Y - blob.r;
        blob.vy = -Math.abs(blob.vy) * FLOOR_BOUNCE;
        if (Math.abs(blob.vy) < 10) {
          blob.vy = 0;
        }
      }
    }

    const merges = [];

    for (let i = 0; i < state.blobs.length; i++) {
      const a = state.blobs[i];
      for (let j = i + 1; j < state.blobs.length; j++) {
        const b = state.blobs[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distSq = dx * dx + dy * dy;
        const minDist = a.r + b.r;
        if (distSq >= minDist * minDist) {
          continue;
        }

        const dist = Math.sqrt(distSq) || 0.0001;
        const nx = dx / dist;
        const ny = dy / dist;
        const overlap = minDist - dist;
        const massA = getBlobMass(a);
        const massB = getBlobMass(b);
        const invMassA = 1 / massA;
        const invMassB = 1 / massB;
        const invMassSum = invMassA + invMassB;

        a.x -= nx * overlap * (invMassA / invMassSum);
        a.y -= ny * overlap * (invMassA / invMassSum);
        b.x += nx * overlap * (invMassB / invMassSum);
        b.y += ny * overlap * (invMassB / invMassSum);

        const rvx = b.vx - a.vx;
        const rvy = b.vy - a.vy;
        const rel = rvx * nx + rvy * ny;
        const verticalLoad = Math.max(0, (a.r + b.r) - Math.abs(a.y - b.y));
        const tx = -ny;
        const ty = nx;
        const tangentRel = rvx * tx + rvy * ty;

        if (rel < 0) {
          const impulse = (-(1 + BLOB_RESTITUTION) * rel) / invMassSum;
          a.vx -= impulse * nx * invMassA;
          a.vy -= impulse * ny * invMassA;
          b.vx += impulse * nx * invMassB;
          b.vy += impulse * ny * invMassB;

          if (rel < -210) {
            const lowerBlob = a.y > b.y ? a : b;
            const upperBlob = a.y > b.y ? b : a;
            setBlobExpression(lowerBlob, "bonk_hurt", 0.55);
            if (upperBlob.vy > 160) {
              setBlobExpression(upperBlob, "oops", 0.28);
            }
          }
        }

        const separationBoost = Math.min(26, overlap * 6.2);
        a.vx -= nx * separationBoost * invMassA * 7.2;
        a.vy -= ny * separationBoost * invMassA * 3.3;
        b.vx += nx * separationBoost * invMassB * 7.2;
        b.vy += ny * separationBoost * invMassB * 3.3;

        const slipBoost = Math.min(12, Math.abs(tangentRel) * 0.05 + overlap * 1.2);
        a.vx -= tx * slipBoost * invMassA;
        a.vy -= ty * slipBoost * invMassA * 0.2;
        b.vx += tx * slipBoost * invMassB;
        b.vy += ty * slipBoost * invMassB * 0.2;

        if (verticalLoad > minDist * 0.24) {
          const sideDir = dx === 0 ? (Math.random() > 0.5 ? 1 : -1) : Math.sign(dx);
          const squishPower = Math.min(1, verticalLoad / minDist);
          const lateral = STACK_SQUISH_PUSH * squishPower;
          const downward = STACK_SQUISH_DOWN * squishPower;

          a.vx -= sideDir * lateral * invMassA;
          b.vx += sideDir * lateral * invMassB;
          a.vy += downward * invMassA;
          b.vy += downward * invMassB;
        }

        if (
          a.level === b.level &&
          a.level < LEVELS.length - 1 &&
          a.age > 0 &&
          b.age > 0 &&
          dist <= minDist - MERGE_TOUCH_GAP
        ) {
          merges.push([a.id, b.id]);
        }
      }
    }

    if (merges.length > 0) {
      const used = new Set();
      for (const [aId, bId] of merges) {
        if (used.has(aId) || used.has(bId)) {
          continue;
        }
        const a = state.blobs.find((item) => item.id === aId);
        const b = state.blobs.find((item) => item.id === bId);
        if (!a || !b || a.level !== b.level || a.level >= LEVELS.length - 1) {
          continue;
        }

        used.add(aId);
        used.add(bId);

        const newLevel = a.level + 1;
        const merged = createBlob(
          newLevel,
          (a.x + b.x) / 2,
          (a.y + b.y) / 2,
          (a.vx + b.vx) * 0.02,
          Math.min((a.vy + b.vy) * 0.02, -175)
        );
        setBlobExpression(merged, MERGE_EXPRESSIONS[newLevel] || "big_smirk", 0.95 + newLevel * 0.03);

        state.blobs = state.blobs.filter((blob) => blob.id !== aId && blob.id !== bId);
        state.blobs.push(merged);
        applyMergeShockwave(merged.x, merged.y, merged.r, [merged.id]);

        state.score += LEVELS[newLevel].score;
        state.mergeCount += 1;
        completeOnboardingStep("first_merge");
        if (state.firstMergeAt <= 0) {
          state.firstMergeAt = getRunSeconds();
        }
        const newBestTierReached = newLevel > state.maxLevelReached;
        state.maxLevelReached = Math.max(state.maxLevelReached, newLevel);
        spawnPopup(merged.x, merged.y, `啵！+${LEVELS[newLevel].score}`, LEVELS[newLevel].color);
        spawnBurst(
          merged.x,
          merged.y,
          LEVELS[newLevel].color,
          1 + newLevel * 0.24,
          newLevel >= 5 ? LEVELS[newLevel].name : ""
        );
        spawnSparks(
          merged.x,
          merged.y,
          LEVELS[newLevel].color,
          10 + newLevel * 2,
          160 + newLevel * 28,
          0.55 + newLevel * 0.03
        );
        if (newLevel >= 4) {
          state.cameraPunch = Math.max(state.cameraPunch, 0.02 + newLevel * 0.004);
        }
        playTone({
          frequency: 420 + newLevel * 48,
          duration: Math.min(0.14, 0.07 + newLevel * 0.006),
          type: "sine",
          gain: 0.028
        });
        if (newBestTierReached && newLevel >= 4) {
          setStatus(`达成 ${LEVELS[newLevel].name}！这一合很漂亮`);
          spawnPopup(merged.x, merged.y - 26, `达成 ${LEVELS[newLevel].name}`, "#fef3c7");
        }
        if (state.mergeCount === 1) {
          unlockMilestone("first_merge", "第一次合并", "你已经完成第一次合并，玩法循环已经跑起来了。", "#fde68a");
          setCoachMoment(
            "第一次合并",
            "很好，已经进入节奏了",
            "接下来优先围绕最近的同级球继续做第二次合并，不要急着只往高处堆。"
          );
        }
        if (state.mergeCount >= 3) {
          unlockMilestone("three_merges", "三连合并", "累计完成 3 次合并，已经进入连锁节奏。", "#bae6fd");
        }
        if (newLevel >= 4) {
          unlockMilestone("reach_level_5", "合出凝胶兽", "达成中盘关键节点：出现更大体型后，空间管理会更重要。", "#e9d5ff");
        }
        if (newLevel >= 6) {
          unlockMilestone("reach_level_7", "合出巨啵体", "你已经进入高手区间，这局值得截图。", "#fecaca");
        }
        if (!state.midgameHintShown && state.maxLevelReached >= 4) {
          state.midgameHintShown = true;
          setCoachMoment(
            "进入中盘",
            "大块头出现了，开始重视空间管理",
            "从现在开始，先处理接近顶部的区域，盲目追更高阶会更容易卡死。"
          );
        }
        if (!state.recordBeaten && state.score > state.best) {
          state.recordBeaten = true;
          setStatus("新纪录达成！继续冲更高层级");
          spawnBurst(merged.x, merged.y - 18, "#fde68a", 2.2, "新纪录");
          spawnSparks(merged.x, merged.y - 14, "#fde68a", 22, 260, 0.9);
          state.cameraPunch = Math.max(state.cameraPunch, 0.05);
          playTone({ frequency: 880, duration: 0.18, type: "triangle", gain: 0.04 });
        }
        updateHud();
      }
    }

    let activeBlinkCount = 0;
    for (const blob of state.blobs) {
      blob.blinkTimer = Math.max(0, blob.blinkTimer || 0);
      blob.blinkCooldown = Math.max(0, (blob.blinkCooldown || 0) - dt);

      const speed = Math.hypot(blob.vx, blob.vy);
      const settled = blob.y + blob.r >= FLOOR_Y - 0.6 || speed < 26;
      blob.settledTime = settled ? Math.min(8, (blob.settledTime || 0) + dt) : 0;

      if (blob.level < 3) {
        blob.blinkTimer = 0;
        continue;
      }

      if (blob.blinkTimer > 0) {
        blob.blinkTimer = Math.max(0, blob.blinkTimer - dt);
        if (blob.blinkTimer > 0) {
          activeBlinkCount += 1;
        }
        continue;
      }

      if (blob.blinkCooldown <= 0 && blob.settledTime > 0.28 && activeBlinkCount < 5) {
        const blinkChance = blob.level >= 6 ? 0.46 : 0.34;
        if (Math.random() < dt * blinkChance) {
          blob.blinkTimer = 0.08 + Math.random() * 0.08;
          blob.blinkCooldown = 1.5 + Math.random() * 2.6 + blob.level * 0.08;
          activeBlinkCount += 1;
        }
      }
    }

    // ---- Danger rule v3 (requested) ----
    // Only consider the STACK (blobs in pit and not fast-falling).
    // Shake when stack approaches warning zone.
    // Game over only if stack touches the red line and stays 20 seconds.
    let stackTop = Infinity;
    let hasStackCandidate = false;
    for (const blob of state.blobs) {
      if (blob.y < STACK_CHECK_MIN_Y) continue;
      if (Math.abs(blob.vy) > STACK_CHECK_MAX_VY) continue;
      hasStackCandidate = true;
      stackTop = Math.min(stackTop, blob.y - blob.r);
    }

    if (!state.gameOver && state.started) {
      if (hasStackCandidate) {
        const warning = clamp((WARNING_Y - stackTop) / (WARNING_Y - PIT.y), 0, 1);
        state.warningLevel = Math.max(0, state.warningLevel * 0.82 + warning * 0.18);
        state.peakWarningLevel = Math.max(state.peakWarningLevel, state.warningLevel);
        if (!state.warningHintShown && state.warningLevel > 0.22) {
          state.warningHintShown = true;
          completeOnboardingStep("first_warning");
          if (state.firstWarningAt <= 0) {
            state.firstWarningAt = getRunSeconds();
          }
          setCoachMoment(
            "危险预警",
            "顶部开始变挤了，先整理最高层",
            "现在最重要的不是追大球，而是避免堆叠继续往红线上涨。"
          );
        }

        if (stackTop <= DANGER_Y) {
          if (state.overlineTime <= 0) {
            state.triggeredDangerCount += 1;
          }
          state.everInOverline = true;
          state.overlineTime += dt;
          const remain = Math.max(0, OVERLINE_LIMIT - state.overlineTime);
          setStatus(`危险！堆叠已触碰红线，${remain.toFixed(0)} 秒后结束`);
          if (state.overlineTime >= OVERLINE_LIMIT) {
            handleGameOver();
          }
        } else {
          state.overlineTime = Math.max(0, state.overlineTime - dt * 2.8);
          if (state.everInOverline && state.overlineTime <= 0.01) {
            state.everInOverline = false;
            state.recoveryCount += 1;
            unlockMilestone("escape_overline", "险境脱离", "从触线倒计时里把局势拉回来了，干得漂亮。", "#bbf7d0");
          }
          if (state.warningLevel > 0.12) {
            setStatus("危险区附近：继续整理空间，别让它们顶到红线");
          }
        }
      } else {
        state.warningLevel = Math.max(0, state.warningLevel - dt * 1.2);
        state.overlineTime = Math.max(0, state.overlineTime - dt * 2.8);
      }
    }
    updateDangerUI();
    updateCoachUI();
    updateObjectiveUI();
    updateObjectiveRewards();

    for (const popup of state.popups) {
      popup.life -= dt;
      popup.y -= 36 * dt;
    }
    state.popups = state.popups.filter((popup) => popup.life > 0);

    for (const burst of state.bursts) {
      burst.life -= dt;
      burst.radius += 140 * dt * burst.scale;
    }
    state.bursts = state.bursts.filter((burst) => burst.life > 0);

    for (const spark of state.sparks) {
      spark.life -= dt;
      spark.vy += 360 * dt;
      spark.x += spark.vx * dt;
      spark.y += spark.vy * dt;
      spark.vx *= 0.986;
      spark.vy *= 0.988;
    }
    state.sparks = state.sparks.filter((spark) => spark.life > 0);

    state.cameraPunch = Math.max(0, state.cameraPunch - dt * 0.12);
  }

  function drawBackground() {
    ctx.clearRect(0, 0, WORLD.width, WORLD.height);

    const bg = ctx.createLinearGradient(0, 0, 0, WORLD.height);
    bg.addColorStop(0, "#18305a");
    bg.addColorStop(0.5, "#102243");
    bg.addColorStop(1, "#0b172d");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);

    const nebulaA = ctx.createRadialGradient(84, 120, 20, 84, 120, 180);
    nebulaA.addColorStop(0, "rgba(139,92,246,0.28)");
    nebulaA.addColorStop(1, "rgba(139,92,246,0)");
    ctx.fillStyle = nebulaA;
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);

    const nebulaB = ctx.createRadialGradient(WORLD.width - 86, 180, 15, WORLD.width - 86, 180, 150);
    nebulaB.addColorStop(0, "rgba(52,211,153,0.18)");
    nebulaB.addColorStop(1, "rgba(34,197,94,0)");
    ctx.fillStyle = nebulaB;
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);

    for (const star of stars) {
      ctx.fillStyle = `rgba(255,255,255,${star.a})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    }

    drawRoundedRect(PIT.x, PIT.y, PIT.width, PIT.height, 28);
    const pitFill = ctx.createLinearGradient(PIT.x, PIT.y, PIT.x, FLOOR_Y);
    pitFill.addColorStop(0, "rgba(255,255,255,0.11)");
    pitFill.addColorStop(0.55, "rgba(255,255,255,0.045)");
    pitFill.addColorStop(1, "rgba(255,255,255,0.024)");
    ctx.fillStyle = pitFill;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.045)";
    drawRoundedRect(PIT.x + 10, PIT.y + 16, PIT.width - 20, 48, 18);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = `rgba(251,113,133,${0.26 + Math.min(0.62, state.warningLevel * 0.95)})`;
    ctx.lineWidth = isMobileMode ? 4 : 3;
    if (isMobileMode) {
      ctx.shadowColor = `rgba(251,113,133,${0.32 + Math.min(0.4, state.warningLevel * 0.5)})`;
      ctx.shadowBlur = 8 + state.warningLevel * 12;
    }
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(PIT.x + 10, DANGER_Y);
    ctx.lineTo(PIT.x + PIT.width - 10, DANGER_Y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    if (!isMobileMode) {
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.font = "12px sans-serif";
      ctx.fillText("危险线", PIT.x + 12, DANGER_Y - 8);
    }

    if (state.warningLevel > 0.02) {
      const warningHeight = Math.max(0, WARNING_Y - PIT.y);
      ctx.fillStyle = `rgba(251,113,133,${Math.min(0.12, state.warningLevel * 0.12)})`;
      ctx.fillRect(PIT.x + 2, PIT.y + 2, PIT.width - 4, warningHeight);
    }

    if (!state.gameOver) {
      const guideX = clamp(state.pointerX, PIT.x + 12, PIT.x + PIT.width - 12);
      ctx.save();
      ctx.strokeStyle = "rgba(196,181,253,0.48)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.moveTo(guideX, SPAWN_Y + 12);
      ctx.lineTo(guideX, PIT.y + 24);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      drawBlobPreview(guideX, SPAWN_Y, state.nextLevel);
    }
  }

  function drawBlobPreview(x, y, level) {
    const config = LEVELS[level];
    const previewBlob = {
      x,
      y,
      r: config.radius,
      level,
      blinkOffset: 0,
      smileSeed: 0,
      expression: "idle"
    };
    ctx.save();
    ctx.globalAlpha = 0.96;
    drawBlobGlow(x, y, config.radius, config.color, 0.18);
    drawBlobCircle(x, y, config.radius, config.color);
    drawBlobAccessories(x, y, config.radius, level, true);
    drawFace(previewBlob, true);
    ctx.restore();
  }

  function drawBlobGlow(x, y, radius, color, alpha = 0.14) {
    const glow = ctx.createRadialGradient(x, y, radius * 0.25, x, y, radius * 1.65);
    glow.addColorStop(0, colorWithAlpha(color, alpha));
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, radius * 1.55, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawBlobCircle(x, y, radius, color) {
    const gradient = ctx.createRadialGradient(
      x - radius * 0.35,
      y - radius * 0.45,
      radius * 0.1,
      x,
      y,
      radius
    );
    gradient.addColorStop(0, "rgba(255,255,255,0.95)");
    gradient.addColorStop(0.18, "rgba(255,255,255,0.28)");
    gradient.addColorStop(0.19, color);
    gradient.addColorStop(1, shadeColor(color, -22));

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.stroke();
  }

  function shadeColor(hex, percent) {
    const num = Number.parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const r = clamp((num >> 16) + amt, 0, 255);
    const g = clamp(((num >> 8) & 0x00ff) + amt, 0, 255);
    const b = clamp((num & 0x0000ff) + amt, 0, 255);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function colorWithAlpha(hex, alpha) {
    const num = Number.parseInt(hex.replace("#", ""), 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function getBlobPose(blob, radius, preview = false) {
    if (preview) {
      return {
        offsetX: 0,
        offsetY: 0,
        rotation: 0,
        nodProgress: 0,
        recoil: 0,
        hairSwingX: 0,
        squashX: 1,
        squashY: 1
      };
    }

    const settledRatio = clamp((blob.settledTime || 0) / 0.42, 0, 1);
    const grooveRamp = clamp((blob.settledTime || 0) / 1.2, 0, 1);
    const beat = state.time * Math.PI * 2.08;
    const leadNod = Math.pow(Math.max(0, Math.sin(beat)), 1.2);
    const followNod = Math.pow(Math.max(0, Math.sin(beat + Math.PI * 0.56)), 2.1) * 0.72;
    const recoil = Math.pow(Math.max(0, Math.sin(beat + Math.PI * 0.92)), 1.6) * 0.36 * grooveRamp;
    const nodProgress = clamp((leadNod + followNod) * grooveRamp, 0, 1.45);

    return {
      offsetX: -radius * (0.018 * settledRatio + 0.038 * nodProgress - 0.012 * recoil),
      offsetY: radius * (0.014 * settledRatio + 0.12 * nodProgress - 0.038 * recoil),
      rotation: (-0.06 * settledRatio) + (-0.26 * nodProgress) + recoil * 0.08,
      nodProgress,
      recoil,
      hairSwingX: radius * (0.05 + nodProgress * 0.28 - recoil * 0.08),
      squashX: 1 + nodProgress * 0.085 - recoil * 0.02,
      squashY: 1 - nodProgress * 0.14 + recoil * 0.05
    };
  }

  function drawBlobAccessories(x, y, radius, level, preview = false, pose = null) {
    if (level < 4) return;

    const nodProgress = preview ? 0 : pose?.nodProgress || 0;
    const hairSwing = preview ? radius * 0.06 : pose?.hairSwingX || radius * (0.06 + nodProgress * 0.18);

    ctx.save();
    ctx.strokeStyle = "rgba(32,38,64,0.88)";
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(1.8, radius * 0.05);
    ctx.beginPath();
    ctx.moveTo(x, y - radius * 0.86);
    ctx.quadraticCurveTo(
      x - radius * 0.03 - hairSwing * 0.42,
      y - radius * (1.1 + nodProgress * 0.04),
      x - radius * 0.08 - hairSwing,
      y - radius * (1.24 + nodProgress * 0.08)
    );
    ctx.stroke();
    ctx.restore();
  }

  function drawFace(blob, preview = false) {
    const { x, y, r: radius, level } = blob;
    const blink = preview ? 1 : level >= 3 ? ((blob.blinkTimer || 0) > 0 ? clamp(blob.blinkTimer / 0.08, 0.08, 1) : 1) : 1;
    const expression = preview ? "idle" : blob.expression || "idle";
    const eyeOffsetX = radius * 0.28;
    const eyeOffsetY = radius * 0.14;
    const scleraW = Math.max(5.4, radius * 0.145);
    const scleraH = Math.max(5.8, radius * 0.14);
    const pupilR = Math.max(2, radius * 0.045);
    const mouthY = y + radius * 0.18;

    function drawSeriousBrows(kind = "normal") {
      const browY = y - eyeOffsetY - scleraH * 1.15;
      const innerLift = kind === "oops" ? scleraH * 0.22 : scleraH * 0.08;
      const outerDrop = kind === "oops" ? scleraH * 0.14 : scleraH * 0.08;
      ctx.strokeStyle = "rgba(17,22,42,0.95)";
      ctx.lineWidth = Math.max(1.8, radius * 0.05);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x - eyeOffsetX - scleraW * 0.72, browY - outerDrop);
      ctx.lineTo(x - eyeOffsetX + scleraW * 0.56, browY + innerLift);
      ctx.moveTo(x + eyeOffsetX - scleraW * 0.56, browY + innerLift);
      ctx.lineTo(x + eyeOffsetX + scleraW * 0.72, browY - outerDrop);
      ctx.stroke();
    }

    function drawNormalEyes(kind = "normal") {
      if (blink <= 0.2) {
        ctx.strokeStyle = "rgba(18,24,44,0.9)";
        ctx.lineWidth = Math.max(2, radius * 0.06);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x - eyeOffsetX - scleraW * 0.72, y - eyeOffsetY - scleraH * 0.08);
        ctx.lineTo(x - eyeOffsetX + scleraW * 0.72, y - eyeOffsetY + scleraH * 0.05);
        ctx.moveTo(x + eyeOffsetX - scleraW * 0.72, y - eyeOffsetY + scleraH * 0.05);
        ctx.lineTo(x + eyeOffsetX + scleraW * 0.72, y - eyeOffsetY - scleraH * 0.08);
        ctx.stroke();
        drawSeriousBrows(kind);
        return;
      }

      const tilt = kind === "oops" ? 0.08 : 0;
      const eyeHeight = kind === "oops" ? scleraH * 0.9 : scleraH * 0.72;
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "rgba(33, 46, 84, 0.34)";
      ctx.lineWidth = Math.max(1.2, radius * 0.03);
      ctx.beginPath();
      ctx.ellipse(x - eyeOffsetX, y - eyeOffsetY, scleraW, eyeHeight * blink, -tilt, 0, Math.PI * 2);
      ctx.ellipse(x + eyeOffsetX, y - eyeOffsetY, scleraW, eyeHeight * blink, tilt, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      const pupilShiftY = kind === "oops" ? -scleraH * 0.04 : scleraH * 0.01;
      ctx.fillStyle = "#1a2340";
      ctx.beginPath();
      ctx.arc(x - eyeOffsetX, y - eyeOffsetY + pupilShiftY, pupilR, 0, Math.PI * 2);
      ctx.arc(x + eyeOffsetX, y - eyeOffsetY + pupilShiftY, pupilR, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.beginPath();
      ctx.arc(x - eyeOffsetX - pupilR * 0.25, y - eyeOffsetY - pupilR * 0.22, Math.max(1.1, pupilR * 0.3), 0, Math.PI * 2);
      ctx.arc(x + eyeOffsetX - pupilR * 0.25, y - eyeOffsetY - pupilR * 0.22, Math.max(1.1, pupilR * 0.3), 0, Math.PI * 2);
      ctx.fill();
      drawSeriousBrows(kind);
    }

    function drawBonkEyes() {
      ctx.strokeStyle = "rgba(24,30,52,0.94)";
      ctx.lineWidth = Math.max(2.4, radius * 0.065);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x - eyeOffsetX - scleraW * 0.55, y - eyeOffsetY - scleraH * 0.45);
      ctx.lineTo(x - eyeOffsetX + scleraW * 0.55, y - eyeOffsetY + scleraH * 0.45);
      ctx.moveTo(x - eyeOffsetX - scleraW * 0.55, y - eyeOffsetY + scleraH * 0.45);
      ctx.lineTo(x - eyeOffsetX + scleraW * 0.55, y - eyeOffsetY - scleraH * 0.45);
      ctx.moveTo(x + eyeOffsetX - scleraW * 0.55, y - eyeOffsetY - scleraH * 0.45);
      ctx.lineTo(x + eyeOffsetX + scleraW * 0.55, y - eyeOffsetY + scleraH * 0.45);
      ctx.moveTo(x + eyeOffsetX - scleraW * 0.55, y - eyeOffsetY + scleraH * 0.45);
      ctx.lineTo(x + eyeOffsetX + scleraW * 0.55, y - eyeOffsetY - scleraH * 0.45);
      ctx.stroke();
    }

    function drawCheeks() {
      if (level < 2) return;
      ctx.fillStyle = "rgba(255,148,180,0.08)";
      ctx.beginPath();
      ctx.ellipse(x - radius * 0.27, y + radius * 0.07, Math.max(2.6, radius * 0.09), Math.max(1.6, radius * 0.05), 0, 0, Math.PI * 2);
      ctx.ellipse(x + radius * 0.27, y + radius * 0.07, Math.max(2.6, radius * 0.09), Math.max(1.6, radius * 0.05), 0, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawMouth(type) {
      ctx.strokeStyle = "rgba(17,22,42,0.95)";
      ctx.fillStyle = "rgba(17,22,42,0.95)";
      ctx.lineWidth = Math.max(2, radius * 0.065);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();

      if (type === "flat") {
        ctx.moveTo(x - radius * 0.18, mouthY);
        ctx.lineTo(x + radius * 0.18, mouthY);
      } else if (type === "soft_smile") {
        ctx.moveTo(x - radius * 0.2, mouthY - radius * 0.01);
        ctx.quadraticCurveTo(x, mouthY + radius * 0.12, x + radius * 0.2, mouthY - radius * 0.01);
      } else if (type === "open_o") {
        ctx.ellipse(x, mouthY + radius * 0.02, radius * 0.08, radius * 0.11, 0, 0, Math.PI * 2);
        ctx.fill();
        return;
      } else if (type === "wobble") {
        ctx.moveTo(x - radius * 0.18, mouthY);
        ctx.quadraticCurveTo(x - radius * 0.06, mouthY + radius * 0.1, x, mouthY + radius * 0.02);
        ctx.quadraticCurveTo(x + radius * 0.06, mouthY - radius * 0.08, x + radius * 0.18, mouthY + radius * 0.05);
      } else if (type === "big_grin") {
        ctx.moveTo(x - radius * 0.24, mouthY - radius * 0.01);
        ctx.quadraticCurveTo(x, mouthY + radius * 0.2, x + radius * 0.24, mouthY - radius * 0.01);
      } else if (type === "tongue") {
        ctx.moveTo(x - radius * 0.18, mouthY - radius * 0.02);
        ctx.quadraticCurveTo(x, mouthY + radius * 0.18, x + radius * 0.18, mouthY - radius * 0.02);
        ctx.stroke();
        ctx.fillStyle = "rgba(255,110,150,0.95)";
        ctx.beginPath();
        ctx.ellipse(x, mouthY + radius * 0.16, radius * 0.06, radius * 0.09, 0, 0, Math.PI * 2);
        ctx.fill();
        return;
      } else if (type === "zigzag") {
        ctx.moveTo(x - radius * 0.18, mouthY);
        ctx.lineTo(x - radius * 0.1, mouthY + radius * 0.08);
        ctx.lineTo(x, mouthY - radius * 0.02);
        ctx.lineTo(x + radius * 0.1, mouthY + radius * 0.08);
        ctx.lineTo(x + radius * 0.18, mouthY);
      } else if (type === "proud") {
        ctx.moveTo(x - radius * 0.16, mouthY - radius * 0.04);
        ctx.quadraticCurveTo(x + radius * 0.08, mouthY + radius * 0.14, x + radius * 0.2, mouthY - radius * 0.02);
      } else if (type === "star") {
        ctx.moveTo(x - radius * 0.18, mouthY);
        ctx.quadraticCurveTo(x, mouthY + radius * 0.18, x + radius * 0.18, mouthY);
        ctx.moveTo(x - radius * 0.08, mouthY + radius * 0.18);
        ctx.lineTo(x + radius * 0.08, mouthY + radius * 0.18);
      } else {
        ctx.moveTo(x - radius * 0.2, mouthY);
        ctx.quadraticCurveTo(x, mouthY + radius * 0.1, x + radius * 0.2, mouthY);
      }
      ctx.stroke();
    }

    switch (expression) {
      case "bonk_hurt":
        drawBonkEyes();
        drawMouth("open_o");
        break;
      case "oops":
        drawNormalEyes("oops");
        drawMouth("wobble");
        break;
      case "pop_grin":
        drawNormalEyes();
        drawMouth("big_grin");
        break;
      case "cheeky":
        drawNormalEyes();
        drawMouth("proud");
        break;
      case "dizzy_fun":
        drawBonkEyes();
        drawMouth("zigzag");
        break;
      case "big_smirk":
        drawNormalEyes();
        drawMouth("proud");
        break;
      case "gasp_laugh":
        drawNormalEyes("oops");
        drawMouth("open_o");
        break;
      case "spiral_joy":
        drawBonkEyes();
        drawMouth("big_grin");
        break;
      case "proud_goof":
        drawNormalEyes();
        drawMouth("tongue");
        break;
      case "star_struck":
        drawNormalEyes("oops");
        drawMouth("star");
        break;
      case "cosmic_laugh":
        drawNormalEyes();
        drawMouth("big_grin");
        break;
      case "legend_face":
        drawNormalEyes("oops");
        drawMouth("tongue");
        break;
      default:
        drawNormalEyes();
        drawMouth("flat");
        break;
    }
  }

  function drawBlob(blob) {
    const config = LEVELS[blob.level];
    let x = blob.x;
    let y = blob.y;
    let radius = blob.r;

    if (state.gameOver && blob.y - blob.r < DANGER_Y) {
      radius *= 1 + Math.sin(state.time * 12) * 0.02;
    }

    const pose = getBlobPose(blob, radius, false);

    ctx.save();
    ctx.translate(x + pose.offsetX, y + pose.offsetY);
    ctx.rotate(pose.rotation);
    ctx.scale(pose.squashX, pose.squashY);

    drawBlobGlow(0, 0, radius, config.color, 0.12 + Math.min(0.08, blob.level * 0.01));
    drawBlobCircle(0, 0, radius, config.color);
    drawBlobAccessories(0, 0, radius, blob.level, false, pose);
    drawFace({ ...blob, x: 0, y: 0, r: radius }, false);

    if (blob.level >= 5) {
      ctx.fillStyle = "rgba(255,255,255,0.76)";
      ctx.font = `bold ${Math.max(10, radius * 0.32)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(String(blob.level + 1), 0, radius * 0.82);
    }
    ctx.restore();
  }

  function drawPopups() {
    for (const popup of state.popups) {
      ctx.save();
      ctx.globalAlpha = clamp(popup.life, 0, 1);
      ctx.fillStyle = popup.color;
      ctx.shadowColor = popup.color;
      ctx.shadowBlur = 14;
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(popup.text, popup.x, popup.y);
      ctx.restore();
    }
  }

  function drawSparks() {
    for (const spark of state.sparks) {
      const alpha = clamp(spark.life, 0, 1);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = colorWithAlpha(spark.color.startsWith("#") ? spark.color : "#ffffff", 0.55 * alpha);
      ctx.shadowColor = spark.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function drawBursts() {
    for (const burst of state.bursts) {
      const alpha = clamp(burst.life, 0, 1);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = colorWithAlpha(burst.color.startsWith("#") ? burst.color : "#ffffff", 0.55 * alpha);
      ctx.lineWidth = Math.max(2, burst.scale * 1.8);
      ctx.beginPath();
      ctx.arc(burst.x, burst.y, burst.radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(burst.x, burst.y, burst.radius * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = colorWithAlpha(burst.color.startsWith("#") ? burst.color : "#ffffff", 0.28 * alpha);
      ctx.lineWidth = Math.max(1.2, burst.scale);
      ctx.stroke();

      if (burst.label) {
        ctx.fillStyle = "#fff7ed";
        ctx.shadowColor = burst.color;
        ctx.shadowBlur = 16;
        ctx.font = `bold ${Math.min(28, 14 + burst.scale * 3.6)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(burst.label, burst.x, burst.y - burst.radius - 10);
      }
      ctx.restore();
    }
  }

  function drawGameOverOverlay() {
    if (!state.gameOver || resultPanel?.classList.contains("hidden") === false) {
      return;
    }

    ctx.save();
    ctx.fillStyle = "rgba(4, 8, 16, 0.54)";
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);

    drawRoundedRect(52, 266, WORLD.width - 104, 172, 28);
    ctx.fillStyle = "rgba(11,17,31,0.9)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("这局翻车了", WORLD.width / 2, 316);
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "rgba(248,250,252,0.76)";
    ctx.fillText(`得分 ${state.score} · 最高分 ${state.best}`, WORLD.width / 2, 350);
    ctx.fillText("点上方“重新开始”再来一局", WORLD.width / 2, 382);
    ctx.restore();
  }

  function updateDangerShake() {
    if (!gamePanel) {
      return;
    }

    if (
      state.gameOver ||
      !settings.shakeEnabled ||
      (state.warningLevel <= 0.02 && state.overlineTime <= 0)
    ) {
      gamePanel.style.transform = "";
      return;
    }

    const intensity = clamp(state.warningLevel + (state.overlineTime / OVERLINE_LIMIT) * 0.85, 0, 1);
    const amplitude = 0.6 + intensity * 3.4;
    const x = Math.sin(state.time * 42) * amplitude;
    const y = Math.cos(state.time * 31) * amplitude * 0.52;
    const rotate = Math.sin(state.time * 24) * amplitude * 0.08;
    const scale = 1 + state.cameraPunch;
    gamePanel.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
  }

  function render() {
    if (timerValue) {
      if (!state.started) {
        timerValue.textContent = "0:00";
      } else if (!state.paused && !state.gameOver) {
        timerValue.textContent = formatRunTimer(getRunSeconds());
      }
    }
    updateDangerShake();
    drawBackground();
    drawBursts();
    drawSparks();

    const sorted = [...state.blobs].sort((a, b) => a.y - b.y);
    for (const blob of sorted) {
      drawBlob(blob);
    }
    drawPopups();
    drawGameOverOverlay();
  }

  function frame(ts) {
    if (!state.lastTs) {
      state.lastTs = ts;
    }
    const delta = Math.min((ts - state.lastTs) / 1000, 0.033);
    state.lastTs = ts;
    if (state.paused && !state.gameOver) {
      render();
      requestAnimationFrame(frame);
      return;
    }
    state.accumulator += delta;

    while (state.accumulator >= 1 / 60) {
      updatePhysics(1 / 60);
      state.accumulator -= 1 / 60;
    }

    render();
    requestAnimationFrame(frame);
  }

  function toWorldX(clientX) {
    const rect = canvas.getBoundingClientRect();
    const local = ((clientX - rect.left) / rect.width) * WORLD.width;
    return clamp(local, PIT.x + 20, PIT.x + PIT.width - 20);
  }

  function beginPointerInteraction(clientX, clientY, pointerId) {
    ensureAudio();
    ensureMotionControls();
    if (!state.started || (state.paused && !state.gameOver)) return false;
    state.pointerActive = true;
    state.pointerX = toWorldX(clientX);
    state.pointerStartX = clientX;
    state.pointerStartY = clientY;
    state.pointerStartTime = performance.now();
    if (pointerId !== undefined) {
      canvas.setPointerCapture?.(pointerId);
    }
    return true;
  }

  function movePointerInteraction(clientX) {
    if (!state.started || (state.paused && !state.gameOver)) return;
    state.pointerX = toWorldX(clientX);
  }

  function endPointerInteraction(clientX, clientY) {
    if (!state.started) {
      state.pointerActive = false;
      return;
    }
    state.pointerX = toWorldX(clientX);
    if (state.pointerActive) {
      if (isMobileMode) {
        const dx = clientX - state.pointerStartX;
        const dy = clientY - state.pointerStartY;
        const travel = Math.hypot(dx, dy);
        const dt = Math.max(16, performance.now() - state.pointerStartTime);
        const downward = Math.max(0, dy);
        const speed = downward / dt;
        const distanceRatio = clamp((downward - 12) / 170, 0, 1);
        const speedRatio = clamp((speed - 0.1) / 0.9, 0, 1);
        const horizontalPenalty = clamp(Math.abs(dx) / 180, 0, 0.2);
        const power = clamp(0.18 + distanceRatio * 0.42 + speedRatio * 0.3 - horizontalPenalty, 0.16, 0.9);
        if (downward > 12) {
          dropBlob(power);
        } else if (travel <= 14) {
          dropBlob(0.36);
        } else {
          setStatus("点一下就会直接下落，也可以向下滑动投放");
        }
      } else {
        dropBlob();
      }
    }
    state.pointerActive = false;
  }

  canvas.addEventListener("pointerdown", (event) => {
    beginPointerInteraction(event.clientX, event.clientY, event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    movePointerInteraction(event.clientX);
  });

  canvas.addEventListener("pointerup", (event) => {
    endPointerInteraction(event.clientX, event.clientY);
  });

  canvas.addEventListener("pointercancel", () => {
    state.pointerActive = false;
  });

  canvas.addEventListener("touchstart", (event) => {
    if (!isMobileMode) return;
    const touch = event.touches[0];
    if (!touch) return;
    if (beginPointerInteraction(touch.clientX, touch.clientY)) {
      event.preventDefault();
    }
  }, { passive: false });

  canvas.addEventListener("touchmove", (event) => {
    if (!isMobileMode || !state.pointerActive) return;
    const touch = event.touches[0];
    if (!touch) return;
    movePointerInteraction(touch.clientX);
    event.preventDefault();
  }, { passive: false });

  canvas.addEventListener("touchend", (event) => {
    if (!isMobileMode || !state.pointerActive) return;
    const touch = event.changedTouches[0];
    if (!touch) {
      state.pointerActive = false;
      return;
    }
    endPointerInteraction(touch.clientX, touch.clientY);
    event.preventDefault();
  }, { passive: false });

  canvas.addEventListener("touchcancel", () => {
    state.pointerActive = false;
  }, { passive: false });

  window.addEventListener("keydown", (event) => {
    if (isMobileMode) {
      return;
    }
    if (!state.started && (event.code === "Space" || event.code === "Enter")) {
      event.preventDefault();
      startRun();
      return;
    }
    if (event.code === "Escape") {
      event.preventDefault();
      if (state.started && !state.gameOver) {
        if (pausePanel && !pausePanel.classList.contains("hidden")) {
          closePanel(pausePanel);
          setStatus(getPlayStatus());
        } else if (state.panelsOpen === 0) {
          openPanel(pausePanel);
          setStatus("已暂停，点继续或按 Esc 恢复");
        }
      }
      return;
    }
    if (!state.started || state.paused) {
      return;
    }
    if (event.code === "KeyA" || event.code === "ArrowLeft") {
      state.keyboardDir = -1;
    }
    if (event.code === "KeyD" || event.code === "ArrowRight") {
      state.keyboardDir = 1;
    }
    if (event.code === "Space") {
      event.preventDefault();
      dropBlob();
    }
  });

  window.addEventListener("keyup", (event) => {
    if (isMobileMode) {
      return;
    }
    if (
      (event.code === "KeyA" || event.code === "ArrowLeft") &&
      state.keyboardDir < 0
    ) {
      state.keyboardDir = 0;
    }
    if (
      (event.code === "KeyD" || event.code === "ArrowRight") &&
      state.keyboardDir > 0
    ) {
      state.keyboardDir = 0;
    }
  });

  restartBtn.addEventListener("click", () => {
    if (state.started || state.gameOver) {
      quickRestartRun();
      return;
    }
    resetGame();
  });
  resultRestartBtn?.addEventListener("click", quickRestartRun);
  startGameBtn?.addEventListener("click", startRun);
  resumeGameBtn?.addEventListener("click", () => {
    closePanel(pausePanel);
    setStatus(getPlayStatus());
  });
  pauseRestartBtn?.addEventListener("click", quickRestartRun);
  helpBtn?.addEventListener("click", () => {
    openPanel(helpPanel);
    setStatus("先看一下说明，再继续试玩");
  });
  startHelpBtn?.addEventListener("click", () => {
    openPanel(helpPanel);
    setStatus("先看一下说明，再开始这一局");
  });
  pauseHelpBtn?.addEventListener("click", () => {
    openPanel(helpPanel);
    setStatus("先看说明，回来再继续");
  });
  helpCloseBtn?.addEventListener("click", () => {
    closePanel(helpPanel);
    setStatus(state.started ? getPlayStatus() : getReadyStatus());
  });
  leaderboardBtn?.addEventListener("click", () => {
    renderLeaderboard();
    openPanel(leaderboardPanel);
    setStatus("看看本地排行榜，下一局再冲更高分");
  });
  leaderboardCloseBtn?.addEventListener("click", () => closePanel(leaderboardPanel));
  settingsBtn?.addEventListener("click", () => {
    openPanel(settingsPanel);
    setStatus("可以在这里调整音效和危险晃动");
    renderImportBackupHistory();
    renderOperationLogs();
    renderExportRecords();
    renderRestoreRecords();
  });
  settingsCloseBtn?.addEventListener("click", () => closePanel(settingsPanel));
  clearLeaderboardBtn?.addEventListener("click", () => {
    if (!window.confirm("确认清空本地排行榜吗？这不会影响长期进度。")) return;
    resetLeaderboardData();
    appendOperationLog("清空排行榜");
    setStatus("本地排行榜已清空");
  });
  resetProgressBtn?.addEventListener("click", () => {
    if (!window.confirm("确认重置长期进度和长期成就吗？")) return;
    resetProgressData();
    appendOperationLog("重置长期进度");
    setStatus("长期进度已重置");
  });
  resetAllDataBtn?.addEventListener("click", () => {
    if (!window.confirm("确认把排行榜、长期进度、首次引导进度和历史最高分全部重置吗？")) return;
    resetLeaderboardData();
    resetProgressData();
    resetOnboardingData();
    resetBestData();
    clearImportBackup();
    appendOperationLog("全部重置", "已清空排行榜、长期进度、引导进度、最高分和备份");
    setStatus("本地数据已全部重置");
  });

  undoImportBtn?.addEventListener("click", () => {
    if (!readImportBackups().length) {
      window.alert("没有可撤销的导入记录");
      return;
    }
    if (!window.confirm("确认撤销最近一次导入吗？可以连续回退最近几次导入。")) return;
    const ok = restoreImportBackup();
    if (!ok) {
      window.alert("撤销失败：备份数据损坏或缺失");
      return;
    }
    appendOperationLog("撤销最近一次导入");
    setStatus("已撤销最近一次导入");
  });

  createSnapshotBtn?.addEventListener("click", () => {
    const note = getBackupNote();
    const result = saveBackupPoint({ source: "snapshot", note });
    appendOperationLog("创建快照备份", `${backupNameInput?.value ? `名称：${String(backupNameInput.value).trim()}\n` : ""}${backupGroupInput?.value ? `分组：${String(backupGroupInput.value).trim()}\n` : ""}${note ? `备注：${note}\n` : ""}${result.droppedCount ? "已自动淘汰一条旧备份" : "未触发自动淘汰"}`);
    setStatus(result.droppedCount ? "已创建快照备份，最旧备份已自动淘汰" : "已创建快照备份");
    if (backupNameInput) backupNameInput.value = "";
    if (backupNoteInput) backupNoteInput.value = "";
  });

  const handleBackupListClick = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const indexStr = target.getAttribute("data-restore-backup-index");
    const exportIndexStr = target.getAttribute("data-export-backup-index");
    const togglePinIndexStr = target.getAttribute("data-toggle-pin-backup-index");
    const toggleGroupKey = target.getAttribute("data-toggle-backup-group");
    const restoreNamedGroupIndexesStr = target.getAttribute("data-restore-named-group-indexes");
    const restoreNamedGroupModuleStr = target.getAttribute("data-restore-named-group-module-indexes");
    const restoreGroupIndexesStr = target.getAttribute("data-restore-group-indexes");
    const restoreGroupModuleStr = target.getAttribute("data-restore-group-module-indexes");
    const exportGroupSummaryStr = target.getAttribute("data-export-group-summary-indexes");
    const exportGroupIndexesStr = target.getAttribute("data-export-group-indexes");
    const exportGroupModuleStr = target.getAttribute("data-export-group-module-indexes");
    const unpinGroupIndexesStr = target.getAttribute("data-unpin-group-indexes");
    const batchTagIndexesStr = target.getAttribute("data-batch-tag-group-indexes");
    const batchRenameIndexesStr = target.getAttribute("data-batch-rename-group-indexes");
    const batchRegroupIndexesStr = target.getAttribute("data-batch-regroup-indexes");
    const editNameIndexStr = target.getAttribute("data-edit-backup-name-index");
    const editGroupIndexStr = target.getAttribute("data-edit-backup-group-index");
    const editIndexStr = target.getAttribute("data-edit-backup-index");
    const toggleIndexStr = target.getAttribute("data-toggle-backup-index");
    const restoreModuleStr = target.getAttribute("data-restore-backup-module");
    const exportModuleStr = target.getAttribute("data-export-backup-module");
    const selectIndexStr = target.getAttribute("data-select-backup-index");
    const selectArchivedIndexStr = target.getAttribute("data-select-archived-backup-index");
    const archiveIndexStr = target.getAttribute("data-archive-backup-index");
    const unarchiveIndexStr = target.getAttribute("data-unarchive-backup-index");

    if (selectIndexStr) {
      const index = Number(selectIndexStr);
      if (!Number.isFinite(index)) return;
      if (target instanceof HTMLInputElement) {
        state.selectedBackupIndexes[index] = target.checked;
        renderImportBackupHistory();
      }
      return;
    }

    if (selectArchivedIndexStr) {
      const index = Number(selectArchivedIndexStr);
      if (!Number.isFinite(index)) return;
      if (target instanceof HTMLInputElement) {
        state.selectedArchivedBackupIndexes[index] = target.checked;
        renderImportBackupHistory();
      }
      return;
    }

    if (toggleGroupKey) {
      state.collapsedBackupGroups[toggleGroupKey] = !state.collapsedBackupGroups[toggleGroupKey];
      renderImportBackupHistory();
      return;
    }

    if (restoreNamedGroupIndexesStr) {
      const indexes = parseBackupIndexList(restoreNamedGroupIndexesStr);
      const restoreIndex = pickLatestBackupIndex(indexes);
      const backups = readImportBackups();
      if (!Number.isFinite(restoreIndex) || restoreIndex < 0 || restoreIndex >= backups.length) {
        window.alert("恢复失败：这个分组里没有可用备份");
        return;
      }
      const backup = backups[restoreIndex];
      const groupLabel = getBackupGroupLabel(backup?.group);
      if (!window.confirm(`${buildBackupQuickRestoreConfirmText(backup)}\n\n来源分组：${groupLabel}`)) return;
      try {
        const snapshotResult = createQuickRestoreProtectionSnapshot(`${groupLabel} ${getBackupDisplayName(backup)}`);
        const ok = restoreBackupSelectionAtIndex(restoreIndex, getBackupSelectionFromAvailability(backup));
        if (!ok) {
          window.alert("恢复失败：分组备份数据损坏或缺失");
          return;
        }
        appendRestoreRecord("分组整区恢复", `${groupLabel}\n使用：${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`, {
          scope: "group",
          kind: "bundle",
          archived: Boolean(backup?.archived),
          sourceName: groupLabel,
          backupLabel: getBackupDisplayName(backup),
          backupSourceLabel: getBackupSourceLabel(backup?.source),
          backupCreatedAt: backup?.createdAt || "",
          backupGroupLabel: getBackupGroupLabel(backup?.group),
          backupTagLabel: formatBackupTags(parseBackupTags(backup?.tag)),
          backupNoteLabel: backup?.note || ""
        });
        appendOperationLog("快速恢复分组", `${groupLabel}\n使用：${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`);
        setStatus(snapshotResult.droppedCount ? `已从分组“${groupLabel}”恢复，并创建保护快照（已自动淘汰一条旧备份）` : `已从分组“${groupLabel}”恢复，并创建保护快照`);
      } catch (err) {
        window.alert(`恢复失败：${err instanceof Error ? err.message : String(err)}`);
      }
      return;
    }

    if (restoreNamedGroupModuleStr) {
      const separatorIndex = restoreNamedGroupModuleStr.lastIndexOf(":");
      const indexText = separatorIndex >= 0 ? restoreNamedGroupModuleStr.slice(0, separatorIndex) : "";
      const moduleKey = separatorIndex >= 0 ? restoreNamedGroupModuleStr.slice(separatorIndex + 1) : "";
      const indexes = parseBackupIndexList(indexText);
      const restoreIndex = pickLatestBackupIndex(indexes, { moduleKey });
      const backups = readImportBackups();
      if (!Number.isFinite(restoreIndex) || restoreIndex < 0 || restoreIndex >= backups.length) {
        window.alert("恢复失败：这个分组里没有可恢复的对应模块");
        return;
      }
      const backup = backups[restoreIndex];
      const groupLabel = getBackupGroupLabel(backup?.group);
      if (!window.confirm(`${buildBackupQuickModuleRestoreConfirmText(backup, moduleKey)}\n\n来源分组：${groupLabel}`)) return;
      const selection = {
        leaderboard: moduleKey === "leaderboard",
        progress: moduleKey === "progress",
        onboarding: moduleKey === "onboarding",
        best: moduleKey === "best",
        settings: moduleKey === "settings",
        mergeLeaderboard: false,
        mergeProgress: false,
        mergeOnboarding: false
      };
      try {
        const snapshotResult = createQuickRestoreProtectionSnapshot(`${groupLabel} ${getBackupDisplayName(backup)} ${getBackupModuleDisplayName(moduleKey)}`);
        const ok = restoreBackupSelectionAtIndex(restoreIndex, selection);
        if (!ok) {
          window.alert("恢复失败：分组备份缺少该模块或模块无效");
          return;
        }
        appendRestoreRecord(`分组${getBackupModuleDisplayName(moduleKey)}恢复`, `${groupLabel}\n使用：${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`, {
          scope: "group",
          kind: "module",
          moduleKey,
          archived: Boolean(backup?.archived),
          sourceName: groupLabel,
          backupLabel: getBackupDisplayName(backup),
          moduleLabel: getBackupModuleDisplayName(moduleKey),
          backupSourceLabel: getBackupSourceLabel(backup?.source),
          backupCreatedAt: backup?.createdAt || "",
          backupGroupLabel: getBackupGroupLabel(backup?.group),
          backupTagLabel: formatBackupTags(parseBackupTags(backup?.tag)),
          backupNoteLabel: backup?.note || ""
        });
        appendOperationLog(`快速恢复分组${getBackupModuleDisplayName(moduleKey)}`, `${groupLabel}\n使用：${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`);
        setStatus(snapshotResult.droppedCount ? `已从分组“${groupLabel}”恢复${getBackupModuleDisplayName(moduleKey)}，并创建保护快照（已自动淘汰一条旧备份）` : `已从分组“${groupLabel}”恢复${getBackupModuleDisplayName(moduleKey)}，并创建保护快照`);
      } catch (err) {
        window.alert(`恢复失败：${err instanceof Error ? err.message : String(err)}`);
      }
      return;
    }

    if (restoreGroupIndexesStr) {
      const indexes = parseBackupIndexList(restoreGroupIndexesStr);
      const restoreIndex = pickLatestBackupIndex(indexes);
      const backups = readImportBackups();
      if (!Number.isFinite(restoreIndex) || restoreIndex < 0 || restoreIndex >= backups.length) {
        window.alert("恢复失败：这个置顶区里没有可用备份");
        return;
      }
      const backup = backups[restoreIndex];
      if (!window.confirm(buildBackupQuickRestoreConfirmText(backup))) return;
      try {
        const snapshotResult = createQuickRestoreProtectionSnapshot(getBackupDisplayName(backup));
        const ok = restoreBackupSelectionAtIndex(restoreIndex, getBackupSelectionFromAvailability(backup));
        if (!ok) {
          window.alert("恢复失败：置顶备份数据损坏或缺失");
          return;
        }
        appendRestoreRecord("置顶区整区恢复", `${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`, {
          scope: "pinned",
          kind: "bundle",
          archived: Boolean(backup?.archived),
          sourceName: Boolean(backup?.archived) ? "置顶归档" : "置顶备份",
          backupLabel: getBackupDisplayName(backup),
          backupSourceLabel: getBackupSourceLabel(backup?.source),
          backupCreatedAt: backup?.createdAt || "",
          backupGroupLabel: getBackupGroupLabel(backup?.group),
          backupTagLabel: formatBackupTags(parseBackupTags(backup?.tag)),
          backupNoteLabel: backup?.note || ""
        });
        appendOperationLog("快速恢复置顶区", `${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`);
        setStatus(snapshotResult.droppedCount ? "已从最新置顶备份恢复，并创建保护快照（已自动淘汰一条旧备份）" : "已从最新置顶备份恢复，并创建保护快照");
      } catch (err) {
        window.alert(`恢复失败：${err instanceof Error ? err.message : String(err)}`);
      }
      return;
    }

    if (restoreGroupModuleStr) {
      const separatorIndex = restoreGroupModuleStr.lastIndexOf(":");
      const indexText = separatorIndex >= 0 ? restoreGroupModuleStr.slice(0, separatorIndex) : "";
      const moduleKey = separatorIndex >= 0 ? restoreGroupModuleStr.slice(separatorIndex + 1) : "";
      const indexes = parseBackupIndexList(indexText);
      const restoreIndex = pickLatestBackupIndex(indexes, { moduleKey });
      const backups = readImportBackups();
      if (!Number.isFinite(restoreIndex) || restoreIndex < 0 || restoreIndex >= backups.length) {
        window.alert("恢复失败：这个置顶区里没有可恢复的对应模块");
        return;
      }
      const backup = backups[restoreIndex];
      if (!window.confirm(buildBackupQuickModuleRestoreConfirmText(backup, moduleKey))) return;
      const selection = {
        leaderboard: moduleKey === "leaderboard",
        progress: moduleKey === "progress",
        onboarding: moduleKey === "onboarding",
        best: moduleKey === "best",
        settings: moduleKey === "settings",
        mergeLeaderboard: false,
        mergeProgress: false,
        mergeOnboarding: false
      };
      try {
        const snapshotResult = createQuickRestoreProtectionSnapshot(`${getBackupDisplayName(backup)} ${getBackupModuleDisplayName(moduleKey)}`);
        const ok = restoreBackupSelectionAtIndex(restoreIndex, selection);
        if (!ok) {
          window.alert("恢复失败：置顶备份缺少该模块或模块无效");
          return;
        }
        appendRestoreRecord(`置顶区${getBackupModuleDisplayName(moduleKey)}恢复`, `${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`, {
          scope: "pinned",
          kind: "module",
          moduleKey,
          archived: Boolean(backup?.archived),
          sourceName: Boolean(backup?.archived) ? "置顶归档" : "置顶备份",
          backupLabel: getBackupDisplayName(backup),
          moduleLabel: getBackupModuleDisplayName(moduleKey),
          backupSourceLabel: getBackupSourceLabel(backup?.source),
          backupCreatedAt: backup?.createdAt || "",
          backupGroupLabel: getBackupGroupLabel(backup?.group),
          backupTagLabel: formatBackupTags(parseBackupTags(backup?.tag)),
          backupNoteLabel: backup?.note || ""
        });
        appendOperationLog(`快速恢复置顶区${getBackupModuleDisplayName(moduleKey)}`, `${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`);
        setStatus(snapshotResult.droppedCount ? `已从置顶区恢复${getBackupModuleDisplayName(moduleKey)}，并创建保护快照（已自动淘汰一条旧备份）` : `已从置顶区恢复${getBackupModuleDisplayName(moduleKey)}，并创建保护快照`);
      } catch (err) {
        window.alert(`恢复失败：${err instanceof Error ? err.message : String(err)}`);
      }
      return;
    }

    if (exportGroupSummaryStr) {
      const indexes = parseBackupIndexList(exportGroupSummaryStr);
      const backups = readImportBackups();
      const selectedBackups = indexes.map((index) => backups[index]).filter(Boolean);
      if (!selectedBackups.length) return;
      const title = selectedBackups.some((backup) => backup?.archived) ? "置顶归档清单" : "置顶备份清单";
      const bundle = buildBackupSummaryBundlePayload(selectedBackups, title);
      const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
      const filename = promptExportFilename(`啵啵星团_${title}_${stamp}`);
      if (!filename) return;
      downloadJson(filename, bundle);
      appendExportRecord("置顶区清单摘要", filename, `${title}\n数量：${selectedBackups.length}`, { scope: "pinned", kind: "summary", archived: title.includes("归档") });
      appendOperationLog("导出置顶区清单摘要", `${title}\n数量：${selectedBackups.length}`);
      setStatus("已导出置顶区清单摘要");
      return;
    }

    if (exportGroupIndexesStr) {
      const indexes = parseBackupIndexList(exportGroupIndexesStr);
      const backups = readImportBackups();
      const selectedBackups = indexes.map((index) => backups[index]).filter(Boolean);
      if (!selectedBackups.length) return;
      const title = selectedBackups.some((backup) => backup?.archived) ? "置顶归档" : "置顶备份";
      const bundle = buildBackupBundlePayload(selectedBackups, title);
      const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
      const filename = promptExportFilename(`啵啵星团_${title}_${stamp}`);
      if (!filename) return;
      downloadJson(filename, bundle);
      appendExportRecord("置顶区整包导出", filename, `${title}\n数量：${selectedBackups.length}`, { scope: "pinned", kind: "bundle", archived: title.includes("归档") });
      appendOperationLog("导出置顶区", `${title}\n数量：${selectedBackups.length}`);
      setStatus("已导出置顶区");
      return;
    }

    if (exportGroupModuleStr) {
      const separatorIndex = exportGroupModuleStr.lastIndexOf(":");
      const indexText = separatorIndex >= 0 ? exportGroupModuleStr.slice(0, separatorIndex) : "";
      const moduleKey = separatorIndex >= 0 ? exportGroupModuleStr.slice(separatorIndex + 1) : "";
      const indexes = parseBackupIndexList(indexText);
      const backups = readImportBackups();
      const selectedBackups = indexes.map((index) => backups[index]).filter(Boolean);
      if (!selectedBackups.length) return;
      const title = selectedBackups.some((backup) => backup?.archived) ? "置顶归档" : "置顶备份";
      const moduleNameMap = {
        leaderboard: "排行榜",
        progress: "长期进度",
        onboarding: "引导进度",
        best: "最高分",
        settings: "设置"
      };
      const bundle = buildBackupModuleBundlePayload(selectedBackups, moduleKey, `${title}${moduleNameMap[moduleKey] || moduleKey}`);
      if (!bundle.backups.length) {
        window.alert("导出失败：这个置顶区里没有可导出的对应模块");
        return;
      }
      const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
      const filename = promptExportFilename(`啵啵星团_${title}_${moduleNameMap[moduleKey] || moduleKey}_${stamp}`);
      if (!filename) return;
      downloadJson(filename, bundle);
      appendExportRecord("置顶区模块导出", filename, `${title}\n模块：${moduleNameMap[moduleKey] || moduleKey}\n数量：${bundle.backups.length}`, { scope: "pinned", kind: "module", archived: title.includes("归档"), moduleKey });
      appendOperationLog("导出置顶区模块集", `${title}\n模块：${moduleNameMap[moduleKey] || moduleKey}\n数量：${bundle.backups.length}`);
      setStatus(`已导出${moduleNameMap[moduleKey] || moduleKey}合集`);
      return;
    }

    if (unpinGroupIndexesStr) {
      const indexes = parseBackupIndexList(unpinGroupIndexesStr);
      const backups = readImportBackups();
      if (!indexes.length) return;
      indexes.forEach((index) => {
        if (backups[index]) backups[index].pinned = false;
      });
      writeImportBackups(backups);
      appendOperationLog("取消全部置顶", `数量：${indexes.length}`);
      setStatus("已取消该置顶区的全部置顶");
      return;
    }

    if (batchTagIndexesStr) {
      const indexes = parseBackupIndexList(batchTagIndexesStr);
      const backups = readImportBackups();
      if (!indexes.length) return;
      const sample = backups[indexes[0]];
      const nextTag = window.prompt(`给“${getBackupGroupLabel(sample?.group)}”整组设置标签：`, String(sample?.tag || ""));
      if (nextTag === null) return;
      const normalized = normalizeBackupTagValue(nextTag);
      indexes.forEach((index) => {
        if (backups[index]) backups[index].tag = normalized;
      });
      writeImportBackups(backups);
      appendOperationLog("整组改标签", `${getBackupGroupLabel(sample?.group)}\n标签：${normalized || "无"}\n数量：${indexes.length}`);
      setStatus("已完成整组打标签");
      return;
    }

    if (batchRenameIndexesStr) {
      const indexes = parseBackupIndexList(batchRenameIndexesStr);
      const backups = readImportBackups();
      if (!indexes.length) return;
      const sample = backups[indexes[0]];
      const baseName = window.prompt(`给“${getBackupGroupLabel(sample?.group)}”整组改名。\n输入基础名称后，会按当前顺序命名为“名称 1 / 名称 2 ...”。\n留空则清空这组名称。`, sample?.name || "");
      if (baseName === null) return;
      const normalized = String(baseName).trim().slice(0, 24);
      indexes.forEach((index, order) => {
        if (!backups[index]) return;
        backups[index].name = normalized ? `${normalized} ${order + 1}`.slice(0, 32) : "";
      });
      writeImportBackups(backups);
      appendOperationLog("整组改名", `${getBackupGroupLabel(sample?.group)}\n数量：${indexes.length}`);
      setStatus("已完成整组改名");
      return;
    }

    if (batchRegroupIndexesStr) {
      const indexes = parseBackupIndexList(batchRegroupIndexesStr);
      const backups = readImportBackups();
      if (!indexes.length) return;
      const sample = backups[indexes[0]];
      const nextGroup = window.prompt("将这一组备份移动到哪个分组？留空表示移到“未分组”。", String(sample?.group || ""));
      if (nextGroup === null) return;
      const normalizedGroup = String(nextGroup).trim().slice(0, 24);
      indexes.forEach((index) => {
        if (!backups[index]) return;
        backups[index].group = normalizedGroup;
      });
      writeImportBackups(backups);
      appendOperationLog("整组改组", `${getBackupGroupLabel(sample?.group)} → ${normalizedGroup || "未分组"}\n数量：${indexes.length}`);
      setStatus("已完成整组改组");
      return;
    }

    if (togglePinIndexStr) {
      const index = Number(togglePinIndexStr);
      const backups = readImportBackups();
      if (!Number.isFinite(index) || index < 0 || index >= backups.length) return;
      backups[index].pinned = !backups[index].pinned;
      writeImportBackups(backups);
      appendOperationLog(backups[index].pinned ? "置顶备份" : "取消置顶", getBackupDisplayName(backups[index]));
      setStatus(backups[index].pinned ? "已置顶备份" : "已取消置顶");
      return;
    }

    if (indexStr) {
      const index = Number(indexStr);
      if (!Number.isFinite(index)) return;
      const backups = readImportBackups();
      const backup = backups[index];
      if (!window.confirm(buildBackupRestoreConfirmText(backup))) return;
      const ok = restoreImportBackupAtIndex(index);
      if (!ok) {
        window.alert("恢复失败：备份索引无效或数据损坏");
        return;
      }
      appendOperationLog("恢复到备份点", getBackupDisplayName(backup));
      setStatus("已恢复到指定备份点");
      return;
    }

    if (exportIndexStr) {
      const index = Number(exportIndexStr);
      const backups = readImportBackups();
      if (!Number.isFinite(index) || index < 0 || index >= backups.length) return;
      const backup = backups[index];
      const payload = buildPayloadFromBackup(backup);
      const stamp = (backup?.createdAt || new Date().toISOString()).slice(0, 10).replaceAll("-", "");
      const notePart = sanitizeFilePart(backup?.note || backup?.source || "备份");
      downloadJson(`啵啵星团_备份点_${stamp}_${notePart || "backup"}.json`, payload);
      setStatus("已导出指定备份点");
      return;
    }

    if (editIndexStr) {
      const index = Number(editIndexStr);
      const backups = readImportBackups();
      if (!Number.isFinite(index) || index < 0 || index >= backups.length) return;
      const currentNote = String(backups[index]?.note || "");
      const nextNote = window.prompt("修改这条备份的备注：", currentNote);
      if (nextNote === null) return;
      backups[index].note = String(nextNote).trim().slice(0, 40);
      writeImportBackups(backups);
      appendOperationLog("修改备份备注", `${getBackupDisplayName(backups[index])}\n新备注：${backups[index].note || "无"}`);
      setStatus("已更新备份备注");
      return;
    }

    if (editNameIndexStr) {
      const index = Number(editNameIndexStr);
      const backups = readImportBackups();
      if (!Number.isFinite(index) || index < 0 || index >= backups.length) return;
      const currentName = String(backups[index]?.name || "");
      const nextName = window.prompt("修改这条备份的名称：", currentName);
      if (nextName === null) return;
      backups[index].name = String(nextName).trim().slice(0, 32);
      writeImportBackups(backups);
      appendOperationLog("修改备份名称", `${getBackupDisplayName(backups[index])}\n新名称：${backups[index].name || "无"}`);
      setStatus("已更新备份名称");
      return;
    }

    if (editGroupIndexStr) {
      const index = Number(editGroupIndexStr);
      const backups = readImportBackups();
      if (!Number.isFinite(index) || index < 0 || index >= backups.length) return;
      const currentGroup = String(backups[index]?.group || "");
      const nextGroup = window.prompt("修改这条备份的分组：", currentGroup);
      if (nextGroup === null) return;
      backups[index].group = String(nextGroup).trim().slice(0, 24);
      writeImportBackups(backups);
      appendOperationLog("修改备份分组", `${getBackupDisplayName(backups[index])}\n新分组：${backups[index].group || "未分组"}`);
      setStatus("已更新备份分组");
      return;
    }

    if (toggleIndexStr) {
      const index = Number(toggleIndexStr);
      if (!Number.isFinite(index)) return;
      state.expandedBackupIndexes[index] = !state.expandedBackupIndexes[index];
      renderImportBackupHistory();
      return;
    }

    if (archiveIndexStr) {
      const index = Number(archiveIndexStr);
      const backups = readImportBackups();
      if (!Number.isFinite(index) || index < 0 || index >= backups.length) return;
      backups[index].archived = true;
      delete state.selectedBackupIndexes[index];
      writeImportBackups(backups);
      appendOperationLog("归档备份", getBackupDisplayName(backups[index]));
      setStatus("已归档备份");
      return;
    }

    if (unarchiveIndexStr) {
      const index = Number(unarchiveIndexStr);
      const backups = readImportBackups();
      if (!Number.isFinite(index) || index < 0 || index >= backups.length) return;
      backups[index].archived = false;
      delete state.selectedArchivedBackupIndexes[index];
      writeImportBackups(backups);
      appendOperationLog("取消归档", getBackupDisplayName(backups[index]));
      setStatus("已取消归档");
      return;
    }

    if (restoreModuleStr) {
      const [indexPart, moduleKey] = restoreModuleStr.split(":");
      const index = Number(indexPart);
      const moduleNameMap = {
        leaderboard: "排行榜",
        progress: "长期进度",
        onboarding: "引导进度",
        best: "最高分",
        settings: "设置"
      };
      if (!Number.isFinite(index)) return;
      const backups = readImportBackups();
      const backup = backups[index];
      if (!window.confirm(buildBackupModuleRestoreConfirmText(backup, moduleKey))) return;
      const ok = restoreBackupModuleAtIndex(index, moduleKey);
      if (!ok) {
        window.alert("恢复失败：备份里缺少该模块或模块无效");
        return;
      }
      appendOperationLog(`仅恢复${moduleNameMap[moduleKey] || moduleKey}`, getBackupDisplayName(backup));
      setStatus(`已恢复${moduleNameMap[moduleKey] || moduleKey}`);
      return;
    }

    if (exportModuleStr) {
      const [indexPart, moduleKey] = exportModuleStr.split(":");
      const index = Number(indexPart);
      const backups = readImportBackups();
      if (!Number.isFinite(index) || index < 0 || index >= backups.length) return;
      const backup = backups[index];
      try {
        const payload = buildModulePayloadFromBackup(backup, moduleKey);
        const stamp = (backup?.createdAt || new Date().toISOString()).slice(0, 10).replaceAll("-", "");
        const notePart = sanitizeFilePart(backup?.note || backup?.source || moduleKey);
        const moduleNameMap = {
          leaderboard: "排行榜",
          progress: "长期进度",
          onboarding: "引导进度",
          best: "最高分",
          settings: "设置"
        };
        downloadJson(`啵啵星团_备份模块_${moduleNameMap[moduleKey] || moduleKey}_${stamp}_${notePart || "backup"}.json`, payload);
        setStatus("已导出指定备份模块");
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        window.alert(`导出失败：${message}`);
      }
    }
  };

  importBackupHistory?.addEventListener("click", handleBackupListClick);
  archivedBackupHistory?.addEventListener("click", handleBackupListClick);

  clearBackupHistoryBtn?.addEventListener("click", () => {
    if (!readImportBackups().length) {
      window.alert("当前没有可清空的备份历史");
      return;
    }
    if (!window.confirm("确认清空所有备份历史吗？清空后将不能再从这些备份点恢复。")) return;
    clearImportBackup();
    appendOperationLog("清空备份历史");
    setStatus("已清空备份历史");
  });

  archiveSelectedBackupsBtn?.addEventListener("click", () => {
    const indexes = getSelectedBackupIndexes();
    const backups = readImportBackups();
    if (!indexes.length) {
      window.alert("请先勾选至少一个活动备份");
      return;
    }
    indexes.forEach((index) => {
      if (backups[index]) backups[index].archived = true;
    });
    writeImportBackups(backups);
    state.selectedBackupIndexes = {};
    appendOperationLog("批量归档备份", `数量：${indexes.length}`);
    setStatus("已归档选中的备份");
  });

  pinSelectedBackupsBtn?.addEventListener("click", () => {
    const indexes = getSelectedBackupIndexes();
    const backups = readImportBackups();
    if (!indexes.length) {
      window.alert("请先勾选至少一个活动备份");
      return;
    }
    indexes.forEach((index) => {
      if (backups[index]) backups[index].pinned = true;
    });
    writeImportBackups(backups);
    appendOperationLog("批量置顶备份", `数量：${indexes.length}`);
    setStatus("已置顶选中的备份");
  });

  unpinSelectedBackupsBtn?.addEventListener("click", () => {
    const indexes = getSelectedBackupIndexes();
    const backups = readImportBackups();
    if (!indexes.length) {
      window.alert("请先勾选至少一个活动备份");
      return;
    }
    indexes.forEach((index) => {
      if (backups[index]) backups[index].pinned = false;
    });
    writeImportBackups(backups);
    appendOperationLog("批量取消置顶", `数量：${indexes.length}`);
    setStatus("已取消置顶选中的备份");
  });

  unarchiveSelectedBackupsBtn?.addEventListener("click", () => {
    const indexes = getSelectedArchivedBackupIndexes();
    const backups = readImportBackups();
    if (!indexes.length) {
      window.alert("请先勾选至少一个归档备份");
      return;
    }
    indexes.forEach((index) => {
      if (backups[index]) backups[index].archived = false;
    });
    writeImportBackups(backups);
    state.selectedArchivedBackupIndexes = {};
    appendOperationLog("批量取消归档", `数量：${indexes.length}`);
    setStatus("已取消归档选中的备份");
  });

  pinSelectedArchivedBackupsBtn?.addEventListener("click", () => {
    const indexes = getSelectedArchivedBackupIndexes();
    const backups = readImportBackups();
    if (!indexes.length) {
      window.alert("请先勾选至少一个归档备份");
      return;
    }
    indexes.forEach((index) => {
      if (backups[index]) backups[index].pinned = true;
    });
    writeImportBackups(backups);
    appendOperationLog("批量置顶归档备份", `数量：${indexes.length}`);
    setStatus("已置顶选中的归档备份");
  });

  unpinSelectedArchivedBackupsBtn?.addEventListener("click", () => {
    const indexes = getSelectedArchivedBackupIndexes();
    const backups = readImportBackups();
    if (!indexes.length) {
      window.alert("请先勾选至少一个归档备份");
      return;
    }
    indexes.forEach((index) => {
      if (backups[index]) backups[index].pinned = false;
    });
    writeImportBackups(backups);
    appendOperationLog("批量取消置顶归档备份", `数量：${indexes.length}`);
    setStatus("已取消置顶选中的归档备份");
  });

  exportSelectedBackupsBtn?.addEventListener("click", () => {
    const indexes = getSelectedBackupIndexes();
    const backups = readImportBackups();
    if (!indexes.length) {
      window.alert("请先勾选至少一个备份");
      return;
    }
    indexes.forEach((index) => {
      const backup = backups[index];
      if (!backup) return;
      const payload = buildPayloadFromBackup(backup);
      const stamp = (backup?.createdAt || new Date().toISOString()).slice(0, 10).replaceAll("-", "");
      const notePart = sanitizeFilePart(backup?.note || backup?.source || `backup_${index}`);
      downloadJson(`啵啵星团_选中备份_${stamp}_${notePart || "backup"}.json`, payload);
    });
    setStatus("已导出选中的备份");
  });

  renameSelectedBackupsBtn?.addEventListener("click", () => {
    const indexes = getSelectedBackupIndexes();
    const backups = readImportBackups();
    if (!indexes.length) {
      window.alert("请先勾选至少一个备份");
      return;
    }
    const nextNote = window.prompt("给选中的备份统一设置备注：", "");
    if (nextNote === null) return;
    const normalized = String(nextNote).trim().slice(0, 40);
    indexes.forEach((index) => {
      if (backups[index]) backups[index].note = normalized;
    });
    writeImportBackups(backups);
    setStatus("已更新选中备份的备注");
  });

  tagSelectedBackupsBtn?.addEventListener("click", () => {
    const indexes = getSelectedBackupIndexes();
    const backups = readImportBackups();
    if (!indexes.length) {
      window.alert("请先勾选至少一个备份");
      return;
    }
    const nextTag = window.prompt("给选中的备份统一设置标签：", "");
    if (nextTag === null) return;
    const normalized = normalizeBackupTagValue(nextTag);
    indexes.forEach((index) => {
      if (backups[index]) backups[index].tag = normalized;
    });
    writeImportBackups(backups);
    setStatus("已更新选中备份的标签");
  });

  deleteSelectedBackupsBtn?.addEventListener("click", () => {
    const indexes = getSelectedBackupIndexes();
    const backups = readImportBackups();
    if (!indexes.length) {
      window.alert("请先勾选至少一个备份");
      return;
    }
    if (!window.confirm(`确认删除选中的 ${indexes.length} 条备份吗？`)) return;
    const next = backups.filter((_, index) => !indexes.includes(index));
    writeImportBackups(next);
    state.selectedBackupIndexes = {};
    appendOperationLog("删除选中备份", `数量：${indexes.length}`);
    setStatus("已删除选中的备份");
  });

  archivedBackupSearchInput?.addEventListener("input", () => {
    state.archivedBackupKeyword = String(archivedBackupSearchInput.value || "").trim();
    renderImportBackupHistory();
  });

  clearArchivedBackupsBtn?.addEventListener("click", () => {
    const backups = readImportBackups();
    const { archived } = splitBackups(backups);
    if (!archived.length) {
      window.alert("当前没有可清空的归档备份");
      return;
    }
    if (!window.confirm(`确认清空全部 ${archived.length} 条归档备份吗？`)) return;
    const next = backups.filter((backup) => !backup?.archived);
    writeImportBackups(next);
    state.archivedBackupKeyword = "";
    state.selectedArchivedBackupIndexes = {};
    if (archivedBackupSearchInput) archivedBackupSearchInput.value = "";
    appendOperationLog("清空归档备份", `数量：${archived.length}`);
    setStatus("已清空归档备份");
  });

  clearOperationLogBtn?.addEventListener("click", () => {
    if (!readOperationLogs().length) {
      window.alert("当前没有可清空的操作日志");
      return;
    }
    if (!window.confirm("确认清空本地操作日志吗？")) return;
    writeOperationLogs([]);
    setStatus("已清空操作日志");
  });

  clearExportRecordBtn?.addEventListener("click", () => {
    if (!readExportRecords().length) {
      window.alert("当前没有可清空的导出记录");
      return;
    }
    if (!window.confirm("确认清空最近导出记录吗？")) return;
    writeExportRecords([]);
    setStatus("已清空导出记录");
  });

  clearRestoreRecordBtn?.addEventListener("click", () => {
    if (!readRestoreRecords().length) {
      window.alert("当前没有可清空的恢复记录");
      return;
    }
    if (!window.confirm("确认清空最近恢复记录吗？")) return;
    writeRestoreRecords([]);
    setStatus("已清空恢复记录");
  });

  exportRestoreRecordBtn?.addEventListener("click", () => {
    const payload = buildRestoreRecordExportPayload();
    if (!payload.records.length) {
      window.alert("当前没有可导出的恢复记录，请先调整筛选条件或先产生恢复记录");
      return;
    }
    const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const filename = promptExportFilename(`啵啵星团_恢复记录_${stamp}`);
    if (!filename) return;
    downloadJson(filename, payload);
    appendOperationLog("导出恢复记录", `数量：${payload.count}\n范围：${payload.filters.scope || "all"}\n类型：${payload.filters.kind || "all"}${payload.filters.keyword ? `\n关键词：${payload.filters.keyword}` : ""}`);
    setStatus(`已导出${payload.count}条恢复记录`);
  });

  exportRestoreSummaryBtn?.addEventListener("click", () => {
    const payload = buildRestoreRecordExportPayload();
    if (!payload.records.length) {
      window.alert("当前没有可导出的恢复摘要，请先调整筛选条件或先产生恢复记录");
      return;
    }
    const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const filename = promptTextFilename(`啵啵星团_恢复摘要_${stamp}`);
    if (!filename) return;
    downloadText(filename, buildRestoreRecordTextSummary(payload));
    appendOperationLog("导出恢复摘要", `数量：${payload.count}\n范围：${payload.filters.scope || "all"}\n类型：${payload.filters.kind || "all"}${payload.filters.keyword ? `\n关键词：${payload.filters.keyword}` : ""}`);
    setStatus(`已导出${payload.count}条恢复摘要`);
  });

  exportRecordList?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const indexStr = target.getAttribute("data-repeat-export-record-index");
    if (!indexStr) return;
    const index = Number(indexStr);
    const records = readExportRecords();
    if (!Number.isFinite(index) || index < 0 || index >= records.length) return;
    repeatPinnedExportRecord(records[index]);
  });

  restoreRecordList?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const indexStr = target.getAttribute("data-repeat-restore-record-index");
    if (!indexStr) return;
    const index = Number(indexStr);
    const records = readRestoreRecords();
    if (!Number.isFinite(index) || index < 0 || index >= records.length) return;
    repeatPinnedRestoreRecord(records[index]);
  });

  restoreRecordSearchInput?.addEventListener("input", () => {
    renderRestoreRecords();
  });

  restoreRecordScopeFilter?.addEventListener("change", () => {
    renderRestoreRecords();
  });

  restoreRecordKindFilter?.addEventListener("change", () => {
    renderRestoreRecords();
  });

  backupSearchInput?.addEventListener("input", () => {
    renderImportBackupHistory();
  });

  backupSourceFilter?.addEventListener("change", () => {
    renderImportBackupHistory();
  });

  backupPinnedFilter?.addEventListener("change", () => {
    state.selectedBackupPinnedFilter = backupPinnedFilter.value || "all";
    renderImportBackupHistory();
  });

  backupGroupFilter?.addEventListener("change", () => {
    state.selectedBackupGroupFilter = backupGroupFilter.value || "all";
    renderImportBackupHistory();
  });

  backupTagFilter?.addEventListener("change", () => {
    let selectedValues = Array.from(backupTagFilter.selectedOptions || []).map((option) => option.value);
    const availableTags = Array.from(backupTagFilter.options || [])
      .map((option) => option.value)
      .filter((value) => value !== "all" && value !== "__untagged__");
    // 多选下拉中，“全部标签（清空）”不会自动取消选中；
    // 当用户另外选择了具体标签时，这里需要忽略 "all" 以避免误清空筛选。
    if (selectedValues.includes("all")) {
      selectedValues = selectedValues.filter((value) => value !== "all");
    }
    if (!selectedValues.length) {
      state.selectedBackupTagFilters = [];
    } else {
      setSelectedBackupTagFilters(selectedValues, availableTags);
    }
    renderSelectedTagSummary();
    renderImportBackupHistory();
  });

  backupSortOrder?.addEventListener("change", () => {
    renderImportBackupHistory();
  });

  backupTagStats?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const restoreTagButton = target.closest("[data-restore-tag-indexes]");
    if (restoreTagButton instanceof HTMLElement) {
      const indexes = parseBackupIndexList(restoreTagButton.getAttribute("data-restore-tag-indexes"));
      const restoreIndex = pickLatestBackupIndex(indexes);
      const backups = readImportBackups();
      const tagLabel = restoreTagButton.getAttribute("data-restore-tag-label") || "无标签";
      if (!Number.isFinite(restoreIndex) || restoreIndex < 0 || restoreIndex >= backups.length) {
        window.alert("恢复失败：这个标签下没有可用备份");
        return;
      }
      const backup = backups[restoreIndex];
      if (!window.confirm(`${buildBackupQuickRestoreConfirmText(backup)}\n\n来源标签：${tagLabel}`)) return;
      try {
        const snapshotResult = createQuickRestoreProtectionSnapshot(`标签 ${tagLabel} ${getBackupDisplayName(backup)}`);
        const ok = restoreBackupSelectionAtIndex(restoreIndex, getBackupSelectionFromAvailability(backup));
        if (!ok) {
          window.alert("恢复失败：标签备份数据损坏或缺失");
          return;
        }
        appendRestoreRecord("标签整区恢复", `${tagLabel}\n使用：${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`, {
          scope: "tag",
          kind: "bundle",
          archived: Boolean(backup?.archived),
          sourceName: tagLabel,
          backupLabel: getBackupDisplayName(backup),
          backupSourceLabel: getBackupSourceLabel(backup?.source),
          backupCreatedAt: backup?.createdAt || "",
          backupGroupLabel: getBackupGroupLabel(backup?.group),
          backupTagLabel: formatBackupTags(parseBackupTags(backup?.tag)),
          backupNoteLabel: backup?.note || ""
        });
        appendOperationLog("快速恢复标签", `${tagLabel}\n使用：${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`);
        setStatus(snapshotResult.droppedCount ? `已从标签“${tagLabel}”恢复，并创建保护快照（已自动淘汰一条旧备份）` : `已从标签“${tagLabel}”恢复，并创建保护快照`);
      } catch (err) {
        window.alert(`恢复失败：${err instanceof Error ? err.message : String(err)}`);
      }
      return;
    }

    const restoreTagModuleButton = target.closest("[data-restore-tag-module-indexes]");
    if (restoreTagModuleButton instanceof HTMLElement) {
      const raw = restoreTagModuleButton.getAttribute("data-restore-tag-module-indexes") || "";
      const separatorIndex = raw.lastIndexOf(":");
      const indexText = separatorIndex >= 0 ? raw.slice(0, separatorIndex) : "";
      const moduleKey = separatorIndex >= 0 ? raw.slice(separatorIndex + 1) : "";
      const indexes = parseBackupIndexList(indexText);
      const restoreIndex = pickLatestBackupIndex(indexes, { moduleKey });
      const backups = readImportBackups();
      const tagLabel = restoreTagModuleButton.getAttribute("data-restore-tag-label") || "无标签";
      if (!Number.isFinite(restoreIndex) || restoreIndex < 0 || restoreIndex >= backups.length) {
        window.alert("恢复失败：这个标签下没有可恢复的对应模块");
        return;
      }
      const backup = backups[restoreIndex];
      if (!window.confirm(`${buildBackupQuickModuleRestoreConfirmText(backup, moduleKey)}\n\n来源标签：${tagLabel}`)) return;
      const selection = {
        leaderboard: moduleKey === "leaderboard",
        progress: moduleKey === "progress",
        onboarding: moduleKey === "onboarding",
        best: moduleKey === "best",
        settings: moduleKey === "settings",
        mergeLeaderboard: false,
        mergeProgress: false,
        mergeOnboarding: false
      };
      try {
        const snapshotResult = createQuickRestoreProtectionSnapshot(`标签 ${tagLabel} ${getBackupDisplayName(backup)} ${getBackupModuleDisplayName(moduleKey)}`);
        const ok = restoreBackupSelectionAtIndex(restoreIndex, selection);
        if (!ok) {
          window.alert("恢复失败：标签备份缺少该模块或模块无效");
          return;
        }
        appendRestoreRecord(`标签${getBackupModuleDisplayName(moduleKey)}恢复`, `${tagLabel}\n使用：${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`, {
          scope: "tag",
          kind: "module",
          moduleKey,
          archived: Boolean(backup?.archived),
          sourceName: tagLabel,
          backupLabel: getBackupDisplayName(backup),
          moduleLabel: getBackupModuleDisplayName(moduleKey),
          backupSourceLabel: getBackupSourceLabel(backup?.source),
          backupCreatedAt: backup?.createdAt || "",
          backupGroupLabel: getBackupGroupLabel(backup?.group),
          backupTagLabel: formatBackupTags(parseBackupTags(backup?.tag)),
          backupNoteLabel: backup?.note || ""
        });
        appendOperationLog(`快速恢复标签${getBackupModuleDisplayName(moduleKey)}`, `${tagLabel}\n使用：${getBackupDisplayName(backup)}\n恢复前保护快照：${snapshotResult.droppedCount ? "已创建，且自动淘汰一条旧备份" : "已创建"}`);
        setStatus(snapshotResult.droppedCount ? `已从标签“${tagLabel}”恢复${getBackupModuleDisplayName(moduleKey)}，并创建保护快照（已自动淘汰一条旧备份）` : `已从标签“${tagLabel}”恢复${getBackupModuleDisplayName(moduleKey)}，并创建保护快照`);
      } catch (err) {
        window.alert(`恢复失败：${err instanceof Error ? err.message : String(err)}`);
      }
      return;
    }

    const button = target.closest("[data-tag-stat]");
    if (!(button instanceof HTMLElement)) return;
    const tag = button.getAttribute("data-tag-stat");
    if (!tag || !backupTagFilter) return;
    if (tag === "all") {
      state.selectedBackupTagFilters = [];
      renderSelectedTagSummary();
      renderImportBackupHistory();
      return;
    }
    const current = Array.isArray(state.selectedBackupTagFilters) ? [...state.selectedBackupTagFilters] : [];
    const next = current.includes(tag) ? current.filter((value) => value !== tag) : [...current, tag];
    const availableTags = Array.from(backupTagFilter.options || [])
      .map((option) => option.value)
      .filter((value) => value !== "all" && value !== "__untagged__");
    setSelectedBackupTagFilters(next, availableTags);
    renderSelectedTagSummary();
    renderImportBackupHistory();
  });

  clearTagFilterBtn?.addEventListener("click", () => {
    state.selectedBackupTagFilters = [];
    renderImportBackupHistory();
    setStatus("已清空标签筛选");
  });

  backupCleanupPolicy?.addEventListener("change", () => {
    settings.backupCleanupPolicy = backupCleanupPolicy.value || "recent";
    saveSettings();
    renderImportBackupHistory();
    setStatus("已更新备份清理策略");
  });

  applyCleanupPolicyBtn?.addEventListener("click", () => {
    const backups = readImportBackups();
    if (!backups.length) {
      window.alert("当前没有可整理的备份");
      return;
    }
    const { active, archived } = splitBackups(backups);
    const { next: trimmedActive, dropped } = trimBackupsToPolicyWithDropped(active, settings.backupCleanupPolicy, MAX_IMPORT_BACKUPS);
    if (!dropped.length) {
      window.alert("当前活动备份数量未超限，暂时不需要整理");
      return;
    }
    if (!window.confirm(`将按当前策略整理现有备份，并移除 ${dropped.length} 条备份，确认继续吗？`)) return;
    const keptActive = new Set(trimmedActive);
    const next = backups.filter((item) => item?.archived || keptActive.has(item));
    writeImportBackups(next);
    state.selectedBackupIndexes = {};
    state.expandedBackupIndexes = {};
    const droppedNames = dropped.map((item) => getBackupDisplayName(item)).join("、");
    appendOperationLog("按策略整理备份", `移除：${droppedNames}`);
    setStatus(`已按当前策略整理备份：${droppedNames}`);
  });

  backupNoteInput?.addEventListener("input", () => {
    renderImportBackupHistory();
  });

  backupTagInput?.addEventListener("input", () => {
    renderImportBackupHistory();
  });

  exportDataBtn?.addEventListener("click", () => {
    let payload;
    try {
      payload = buildExportPayload(getExportSelection());
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      window.alert(message);
      return;
    }
    const stamp = new Date().toLocaleDateString("zh-CN").replaceAll("/", "");
    const notePart = sanitizeFilePart(payload.meta?.note);
    const suffix = notePart ? `_${notePart}` : "";
    downloadJson(`啵啵星团_本地数据_${stamp}${suffix}.json`, payload);
    setStatus("已导出数据文件");
  });

  importDataInput?.addEventListener("change", async () => {
    const file = importDataInput.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      const selection = getImportSelection();
      if (!selection.leaderboard && !selection.progress && !selection.onboarding && !selection.best && !selection.settings) {
        window.alert("请先勾选至少一个要恢复的项目");
        importDataInput.value = "";
        return;
      }

      const analysis = analyzeImportPayload(payload);
      const preview = buildImportDiffPreview(payload, selection);
      const selectionText = [
        selection.leaderboard ? "排行榜" : null,
        selection.progress ? "长期进度" : null,
        selection.onboarding ? "引导进度" : null,
        selection.best ? "最高分" : null,
        selection.settings ? "设置" : null
      ].filter(Boolean).join("、") || "（未选择任何恢复项）";

      const missingSelected = [
        selection.leaderboard && !analysis.has.leaderboard ? "排行榜" : null,
        selection.progress && !analysis.has.progress ? "长期进度" : null,
        selection.onboarding && !analysis.has.onboarding ? "引导进度" : null,
        selection.best && !analysis.has.best ? "最高分" : null,
        selection.settings && !analysis.has.settings ? "设置" : null
      ].filter(Boolean);

      renderImportPreview(preview, false);

      const missingLine = missingSelected.length ? `\n\n注意：文件中缺少：${missingSelected.join("、")}（将跳过）` : "";

      const beforeSnap = snapshotForImportSummary(selection);
      if (!window.confirm(`导入预览：\n\n${preview}\n\n本次将恢复：${selectionText}${missingLine}\n\n导入会覆盖当前选中的本地数据，确认继续吗？`)) {
        importDataInput.value = "";
        return;
      }
      const fallbackNote =
        payload?.meta?.note && String(payload.meta.note).trim()
          ? `导入：${String(payload.meta.note).trim().slice(0, 24)}`
          : "";
      const backupResult = saveImportBackup(fallbackNote);
      applyImportPayload(payload, selection);
      const afterSnap = snapshotForImportSummary(selection);
      appendOperationLog("导入本地数据", `恢复项：${selectionText}${missingSelected.length ? `\n跳过：${missingSelected.join("、")}` : ""}`);
      window.alert(buildImportAfterSummary(beforeSnap, afterSnap, selection, [], missingSelected));
      if (backupResult?.droppedCount) {
        setStatus("导入完成：已恢复数据，且最旧备份已自动淘汰");
      } else {
        setStatus(missingSelected.length ? "导入完成：部分项目缺失已跳过" : "导入完成：本地数据已恢复");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      window.alert(`导入失败：${message}`);
      renderImportPreview(`导入失败：${message}`, false);
    } finally {
      importDataInput.value = "";
    }
  });
  pauseBtn?.addEventListener("click", () => {
    if (!state.started || state.gameOver) return;
    if (pausePanel && !pausePanel.classList.contains("hidden")) {
      closePanel(pausePanel);
      setStatus(getPlayStatus());
    } else if (state.panelsOpen === 0) {
      openPanel(pausePanel);
      setStatus("已暂停，点继续恢复");
    }
  });
  audioToggle?.addEventListener("change", () => {
    settings.audioEnabled = audioToggle.checked;
    saveSettings();
    syncBgm();
  });
  shakeToggle?.addEventListener("change", () => {
    settings.shakeEnabled = shakeToggle.checked;
    saveSettings();
    if (!settings.shakeEnabled && gamePanel) {
      gamePanel.style.transform = "";
    }
  });
  volumeRange?.addEventListener("input", () => {
    settings.volume = Number(volumeRange.value) / 100;
    saveSettings();
    syncBgm();
  });

  syncSettingsUI();
  renderLeaderboard();
  renderOnboardingChecklist();
  updateAnalyticsPanel();
  renderImportBackupHistory();
  renderOperationLogs();
  renderExportRecords();
  renderRestoreRecords();
  renderImportPreview("选择一个 JSON 文件后，这里会先显示导入预览和差异摘要。", true);
  updatePauseButton();

  resetGame();
  requestAnimationFrame(frame);
})();
