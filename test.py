import MDAnalysis as mda
import numpy as np
from MDAnalysis.analysis import rms
import matplotlib.pyplot as plt

# Load trajectory and topology
u = mda.Universe("1brs.pdb", "trajectory.dcd")

# Define reference structure for RMSD calculation
ref = mda.Universe("reference.pdb")

# Define RMSD and RoG arrays
rmsd_array = np.zeros((len(u.trajectory),))
rog_array = np.zeros((len(u.trajectory),))

# Calculate RMSD and RoG for each frame
for ts in u.trajectory:
    rmsd = rms.rmsd(u.select_atoms("protein"), ref.select_atoms("protein"))
    rmsd_array[ts.frame] = rmsd
    rog = u.select_atoms("protein").radius_of_gyration()
    rog_array[ts.frame] = rog

# Define grid for free-energy landscape
nbins = 100
xmin, xmax = np.min(rmsd_array), np.max(rmsd_array)
ymin, ymax = np.min(rog_array), np.max(rog_array)
xgrid = np.linspace(xmin, xmax, nbins)
ygrid = np.linspace(ymin, ymax, nbins)
xx, yy = np.meshgrid(xgrid, ygrid)

# Calculate free energy using histogram2d
hist, _, _ = np.histogram2d(rmsd_array, rog_array, bins=[xgrid, ygrid])
hist = hist / np.sum(hist)
f = -np.log(hist)

# Plot free-energy landscape
plt.contourf(xx, yy, f.T, levels=100, cmap="viridis")
plt.xlabel("RMSD (Å)")
plt.ylabel("RoG (Å)")
plt.colorbar()
plt.show()
