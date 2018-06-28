# Machine learning & Deep Learning

* Visualization
* REPL
  * ipython
  * jupter
* Sources
  * Websites
  * Documentation


## Ways of Describing a Machine Learning Programming Workflow

How should one program during the idea phase of research? There are certain major
components/tools to utilize during research in order to "clearly" articulate ideas.

* Modular, OOP
* Visualization Ideas
  * Save/Store Visualizations
  * (Theoretical) Database system

# Examples

-------------------

## [Unity](https://github.com/Unity-Technologies/ml-agents)

Unity environment and agents.


-------------------
## AI Safety Gridworld [Deepmind]

A small and simple set of environments to evaluate AI safety. The code is available at 
[Github](https://github.com/deepmind/ai-safety-gridworlds) and the [paper](https://arxiv.org/pdf/1711.09883.pdf) on arxiv.

-------------------

### Installation  

#### 1. Clone repo

First clone the repo recursively such that pycolab is also cloned.

```bash
git clone --recursive https://github.com/deepmind/ai-safety-gridworlds.git 
cd ai-safety-gridworlds.git 
```

With the folder structure
```bash
ai_safety_gridworlds
│
├── ai_safety_gridworlds
│   ├── demonstrations
│   ├── environments
│   │   ├── absent_supervisor.py
│   │   ├── boat_race.py
│   │   ├── distributional_shift.py
│   │   ├── friend_foe.py
│   │   ├── island_navigation.py
│   │   ├── safe_interruptibility.py
│   │   ├── shared
│   │   ├── side_effects_sokoban.py
│   │   ├── tomato_watering.py
│   │   └── whisky_gold.py
│   ├── helpers
│   └── tests
└── pycolab
```

#### 2. Create conda env

```bash
conda create -n ai-safety-gridworld python=2.7 -y
```

#### 3. Install dependencies

Source the correct conda environment and check with `which pip` if it is correct.

```bash
source activate ai-safety-gridworld
which pip
pip install enum34
pip install absl-py
```

#### 4. Run

The repo is not made as a python package so for the imports to work correctly use the following command to run 
`ENVIRONMENT_NAME.py`.


example(`ENVIRONMENT_NAME.py` = boat_race.py):
```bash
PYTHONPATH=. python -B ai_safety_gridworlds/environments/boat_race.py
```

#### 5. Uninstall

Uninstall by deleting the repository and removing the conda virtual environment.
```bash
rm -rf /path/to/repo
conda env remove -n ai-safety-gridworld
```

-------------------
