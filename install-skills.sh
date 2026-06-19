#!/bin/bash
# 批量安装 skills 到当前项目的 .claude/skills/
# 使用符号链接，这样更新源文件时自动生效

SOURCE_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_DIR="$SOURCE_DIR/.claude/skills"

mkdir -p "$SKILLS_DIR"

echo "=== 安装独立 Skills ==="

# 1. karpathy-guidelines
ln -sfn "$SOURCE_DIR/andrej-karpathy-skills/skills/karpathy-guidelines" "$SKILLS_DIR/karpathy-guidelines"
echo "✓ karpathy-guidelines"

# 2. pdf
ln -sfn "$SOURCE_DIR/pdf" "$SKILLS_DIR/pdf"
echo "✓ pdf"

# 3. planning-with-files
ln -sfn "$SOURCE_DIR/planning-with-files（多步骤规划）/skills/planning-with-files" "$SKILLS_DIR/planning-with-files"
echo "✓ planning-with-files"

# 4. pm-agile-workflow
ln -sfn "$SOURCE_DIR/pm-agile-workflow（产品的敏捷开发流）/pm-agile-workflow" "$SKILLS_DIR/pm-agile-workflow"
echo "✓ pm-agile-workflow"

# 5. prd-taskmaster
ln -sfn "$SOURCE_DIR/prd-taskmaster" "$SKILLS_DIR/prd-taskmaster"
echo "✓ prd-taskmaster"

# 6. web-artifacts-builder
ln -sfn "$SOURCE_DIR/web-artifacts-builder" "$SKILLS_DIR/web-artifacts-builder"
echo "✓ web-artifacts-builder"

# 7. webapp-testing
ln -sfn "$SOURCE_DIR/webapp-testing" "$SKILLS_DIR/webapp-testing"
echo "✓ webapp-testing"

echo ""
echo "=== 安装 pm-skills 系列 ==="

PM_SKILLS_DIR="$SOURCE_DIR/pm-skills"
for category_dir in "$PM_SKILLS_DIR"/*/; do
    category=$(basename "$category_dir")
    skills_subdir="$category_dir/skills"
    if [ -d "$skills_subdir" ]; then
        for skill_dir in "$skills_subdir"/*/; do
            skill_name=$(basename "$skill_dir")
            if [ -f "$skill_dir/SKILL.md" ]; then
                ln -sfn "$skill_dir" "$SKILLS_DIR/$skill_name"
                echo "✓ $skill_name (from $category)"
            fi
        done
    fi
done

echo ""
echo "=== 安装 Product-Manager-Skills 系列 ==="

PMS_SKILLS_DIR="$SOURCE_DIR/Product-Manager-Skills/skills"
for skill_dir in "$PMS_SKILLS_DIR"/*/; do
    skill_name=$(basename "$skill_dir")
    if [ -f "$skill_dir/SKILL.md" ]; then
        if [ -L "$SKILLS_DIR/$skill_name" ]; then
            echo "⚠ $skill_name (已存在，跳过)"
        else
            ln -sfn "$skill_dir" "$SKILLS_DIR/$skill_name"
            echo "✓ $skill_name"
        fi
    fi
done

echo ""
echo "=== 安装完成 ==="
echo "Skills 目录: $SKILLS_DIR"
echo "已安装的 skills 数量: $(ls -d "$SKILLS_DIR"/*/ 2>/dev/null | wc -l)"
echo ""
echo "重启 Claude Code 后即可使用新 skills"
echo "输入 /skills 查看所有可用 skills"
