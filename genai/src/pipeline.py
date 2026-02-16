import os
import subprocess
import sys
try:
    from src.predict import generate_dashboard
except ImportError:
    from predict import generate_dashboard


def run_node_process(niche, trend_type="content", mode="good"):
    """
    Calls the Node.js script to generate explanations
    """
    node_script = os.path.join("llm", "main.js")
    
    # Ensure we are in the genai root for correct path resolution
    cmd = ["node", node_script, niche, trend_type, mode]
    
    print(f"Running Node.js: {' '.join(cmd)}")
    
    try:
        result = subprocess.run(
            cmd,
            check=True,
            text=True,
            capture_output=False  # Let it stream to stdout
        )
    except subprocess.CalledProcessError as e:
        print(f"Node.js script failed with return code {e.returncode}")
        sys.exit(1)

def main():
    if len(sys.argv) < 2:
        print("Usage: python src/pipeline.py <niche>")
        print("Example: python src/pipeline.py Tech")
        sys.exit(1)

    # Parse optional arguments
    trend_type = sys.argv[2] if len(sys.argv) > 2 else "content"
    mode = sys.argv[3] if len(sys.argv) > 3 else "good"

    print(f"\n--- 2. Generating Explanations (LLM) ---")
    print(f"Type: {trend_type}, Mode: {mode}")
    
    # Run the Node process with parsed args
    run_node_process(niche, trend_type, mode)

if __name__ == "__main__":
    main()
