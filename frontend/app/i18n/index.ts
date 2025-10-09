"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLang =
    typeof window !== "undefined" ? localStorage.getItem("language") : null;

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                // --- Header & Sidebar ---
                dashboard: "Dashboard",
                todo: "To-do",
                categories: "Categories",
                settings: "Settings",
                logout: "Logout",
                login: "Login",
                "Welcome back": "Welcome back",
                Dashboard: "Dashboard",
                Tasks: "Tasks",
                "Task Categories": "Task Categories",
                Settings: "Settings",
                Logout: "Logout",
                Guest: "Guest",

                // --- Search ---
                "Search your task here...": "Search your task here...",

                // --- Tasks Page / Admin Panel ---
                "Admin Panel": "Admin Panel",
                "Select a user": "Select a user",
                "Add New Task": "Add New Task",
                "No tasks here": "No tasks here",
                "All Tasks": "All Tasks",
                "Viewing": "Viewing",
                "Loading tasks...": "Loading tasks...",
                "No tasks found": "No tasks found",
                "Add Task": "Add Task",
                "Edit Task": "Edit Task",
                Title: "Title",
                Date: "Date",
                "Assign to User": "Assign to User",
                "Task Description": "Task Description",
                "Upload Image": "Upload Image",
                "Drag & Drop files here": "Drag & Drop files here",
                or: "or",
                Browse: "Browse",
                Save: "Save",
                "Uploading...": "Uploading...",
                "Go Back": "Go Back",

                // --- TaskCard ---
                "Assigned to": "Assigned to",
                "Priority": "Priority",
                "Status": "Status",
                "Created on": "Created on",
                Extremely: "Extremely",
                Moderate: "Moderate",
                Low: "Low",
                Completed: "Completed",
                "In Progress": "In Progress",
                "Not Completed": "Not Completed",

                // --- Task Status Chart ---
                "Task Status": "Task Status",
                PENDING: "Pending",
                IN_PROGRESS: "In Progress",
                COMPLETED: "Completed",

                // --- Settings ---
                "Change Password": "Change Password",
                "General Settings": "General Settings",
                "Current Password": "Current Password",
                "New Password": "New Password",
                "Confirm Password": "Confirm Password",
                "Update Password": "Update Password",
                Cancel: "Cancel",
                "Save Changes": "Save Changes",
                "Profile updated successfully!": "Profile updated successfully!",
                "Password updated successfully!": "Password updated successfully!",
                "Failed to update password": "Failed to update password",
                "Failed to update profile": "Failed to update profile",
                Loading: "Loading...",
                "Loading completed tasks...": "Loading completed tasks...",
                "Completed tasks": "Completed tasks",
                Username: "Username",
                Email: "Email",

                // ===== Categories Page =====
                "Add Category": "Add Category",
                "Create Categories": "Create Categories",
                "Category Name": "Category Name",
                "Enter category name": "Enter category name",
                "Create" : "Create",

                // ===== Buttons =====
                "Add": "Add",
                "Update": "Update",
                "Edit": "Edit",
                "Delete": "Delete",
                "Action": "Action",
                "SN": "SN",

                // ===== Status & Priority Modals =====
                "Add Task Status": "Add Task Status",
                "Edit Task Status": "Edit Task Status",
                "Task Status Name": "Task Status Name",
                "e.g. Completed": "e.g. Completed",
                "Add Task Priority": "Add Task Priority",
                "Edit Task Priority": "Edit Task Priority",
                "Task Priority Name": "Task Priority Name",
                "e.g. High": "e.g. High",

                // ===== Category Cards =====
                "Add Task Status Button": "Add Task Status",
                "Task Priority": "Task Priority",
                "Add New Priority": "Add New Priority",
                "Are you sure you want to delete": "Are you sure you want to delete",

                // ===== Example Task Statuses =====
                "Not Started": "Not Started",
                "Extreme": "Extreme",
            },
        },

        // 🇯🇵 Japanese Translations
        jp: {
            translation: {
                // --- Header & Sidebar ---
                dashboard: "ダッシュボード",
                todo: "やることリスト",
                categories: "カテゴリー",
                settings: "設定",
                logout: "ログアウト",
                login: "ログイン",
                "Welcome back": "お帰りなさい",
                Dashboard: "ダッシュボード",
                Tasks: "タスク",
                "Task Categories": "カテゴリー",
                Settings: "設定",
                Logout: "ログアウト",
                Guest: "ゲスト",

                // --- Search ---
                "Search your task here...": "タスクをここで検索...",

                // --- Tasks Page / Admin Panel ---
                "Admin Panel": "管理パネル",
                "Select a user": "ユーザーを選択",
                "Add New Task": "新しいタスクを追加",
                "No tasks here": "タスクはありません",
                "All Tasks": "すべてのタスク",
                "Viewing": "表示中",
                "Loading tasks...": "タスクを読み込み中...",
                "No tasks found": "タスクが見つかりません",
                "Add Task": "タスクを追加",
                "Edit Task": "タスクを編集",
                Title: "タイトル",
                Date: "日付",
                "Assign to User": "ユーザーに割り当てる",
                "Task Description": "タスクの説明",
                "Upload Image": "画像をアップロード",
                "Drag & Drop files here": "ここにドラッグ＆ドロップ",
                or: "または",
                Browse: "参照",
                Save: "保存",
                "Uploading...": "アップロード中...",
                "Go Back": "戻る",

                // --- TaskCard ---
                "Assigned to": "担当者",
                "Priority": "優先度",
                "Status": "ステータス",
                "Created on": "作成日",
                Extremely: "非常に高い",
                Moderate: "中程度",
                Low: "低い",
                Completed: "完了",
                "In Progress": "進行中",
                "Not Completed": "未完了",

                // --- Task Status Chart ---
                "Task Status": "タスクの状況",
                PENDING: "保留中",
                IN_PROGRESS: "進行中",
                COMPLETED: "完了",

                // --- Settings ---
                "Change Password": "パスワードを変更",
                "General Settings": "一般設定",
                "Current Password": "現在のパスワード",
                "New Password": "新しいパスワード",
                "Confirm Password": "パスワードの確認",
                "Update Password": "パスワードを更新",
                Cancel: "キャンセル",
                "Save Changes": "変更を保存",
                "Profile updated successfully!": "プロフィールが正常に更新されました！",
                "Password updated successfully!": "パスワードが正常に更新されました！",
                "Failed to update password": "パスワードの更新に失敗しました",
                "Failed to update profile": "プロフィールの更新に失敗しました",
                Loading: "読み込み中...",
                "Loading completed tasks...": "完了したタスクを読み込み中...",
                "Completed tasks": "完了したタスク",
                Username: "ユーザー名",
                Email: "メールアドレス",

                // ===== Categories Page =====
                "Add Category": "カテゴリーを追加",
                "Create Categories": "カテゴリーを作成",
                "Category Name": "カテゴリー名",
                "Enter category name": "カテゴリー名を入力",
                "Create" : "作成する",

                // ===== Buttons =====
                "Add": "追加",
                "Update": "更新",
                "Edit": "編集",
                "Delete": "削除",
                "Action": "操作",
                "SN": "番号",

                // ===== Status & Priority Modals =====
                "Add Task Status": "タスクの状態を追加",
                "Edit Task Status": "タスクの状態を編集",
                "Task Status Name": "タスクの状態名",
                "e.g. Completed": "例: 完了",
                "Add Task Priority": "優先度を追加",
                "Edit Task Priority": "優先度を編集",
                "Task Priority Name": "優先度の名前",
                "e.g. High": "例: 高い",

                // ===== Category Cards =====
                "Add Task Status Button": "状態を追加",
                "Task Priority": "優先度",
                "Add New Priority": "新しい優先度を追加",
                "Are you sure you want to delete": "本当に削除しますか",

                // ===== Example Task Statuses =====
                "Not Started": "未開始",
                "Extreme": "非常に高い",
            },
        },
    },
    lng: savedLang || "jp",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

// 🧠 Save selected language
i18n.on("languageChanged", (lng) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("language", lng);

    }
});

export default i18n;
