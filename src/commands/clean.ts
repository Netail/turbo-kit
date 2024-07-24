import { rmSync } from "node:fs";

interface CleanProps {
    files: string[];
}

export const clean = ({ files }: CleanProps) => {
    for (const file of files) {
        rmSync(file, { recursive: true });
    }
}
